import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { PostResult as MatchResult } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match, MatchStatus } from './entities/match.entity';
import { Repository } from 'typeorm';
import { LeagueService } from 'src/league/league.service';
import { PlayerService } from 'src/player/player.service';
import { EloRankingService } from 'src/elo-ranking/elo-ranking.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private playerService: PlayerService,
    private leagueService: LeagueService,
    private eloService: EloRankingService
  ) { }

  async create(createMatchDto: CreateMatchDto, challengerId: number) {
    const opponent = await this.playerService.findOne(
      createMatchDto.opponentId,
    );

    if (opponent?.id !== createMatchDto.opponentId) {
      throw new HttpException(
        `no user with id: ${createMatchDto.opponentId}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const league = await this.leagueService.findOne(
      createMatchDto.leagueId,
    );

    const challenger = await this.playerService.findOne(challengerId);

    const match = this.matchRepository.create({
      challenger: challenger!,
      opponent: opponent,
      league: league,
    });

    return this.matchRepository.save(match);
  }

  findAll() {
    return this.matchRepository.find();
  }

  async findOne(id: number) {
    const match = await this.matchRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!match) {
      throw new HttpException(
        `Match with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return match;
  }

  async update(id: number, matchResult: MatchResult, userId: number) {

    const match = await this.findOne(id)

    if (match.opponent.user.id != userId && match.challenger.user.id != userId) {
      throw new HttpException("you cannot report a result for someoneelse", HttpStatus.FORBIDDEN)
    }

    if (match.status == MatchStatus.DONE) {
      throw new HttpException("result already reported", HttpStatus.FORBIDDEN)
    }

    let opponentPoints = 0;
    let challengerPoints = 0;

    if (matchResult.challengerScore > matchResult.opponentScore) {
      challengerPoints = this.eloService.ifWins(match.challenger.points, match.opponent.points)
      opponentPoints = this.eloService.ifLoses(match.opponent.points, match.challenger.points)
    } else {
      challengerPoints = this.eloService.ifLoses(match.challenger.points, match.opponent.points)
      opponentPoints = this.eloService.ifWins(match.opponent.points, match.challenger.points)
    }

    const update = await this.matchRepository.update(id, { ...matchResult, status: MatchStatus.DONE, challengerPoints: challengerPoints, opponentPoints: opponentPoints });

    if (update.affected == 0) {
      throw new HttpException(
        `Match with id ${id} could not be updated`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.playerService.update(match.challenger.id, { points: match.challenger.points + challengerPoints })
    await this.playerService.update(match.opponent.id, { points: match.opponent.points + opponentPoints })

    return this.findOne(id);
  }

  getMatchesForPlayer(userId: number) {
    return this.matchRepository.find({
      where: [{ opponent: { user: { id: userId } } }, { challenger: { user: { id: userId } } }],
    });
  }

  // getChallengedForPlayer(userId: number) {
  //   return this.matchRepository.find({
  //     where: {opponent: {user: {id: userId}}, status: MatchStatus.CHALLENGED}
  //   })
  // }

  remove(id: number) {
    return this.matchRepository.softDelete(id);
  }

  async acceptChallenge(matchId: number, userId: number) {
    const match = await this.findOne(matchId);
    if (match.opponent.user.id != userId) {
      throw new HttpException("you cannot accept a match for someoneelse", HttpStatus.FORBIDDEN)
    }

    return this.matchRepository.update(matchId, { status: MatchStatus.ACCEPTED })
  }

  async declineChallenge(matchId: number, userId: number) {
    const match = await this.findOne(matchId);
    if (match.opponent.user.id != userId) {
      throw new HttpException("you cannot accept a match for someoneelse", HttpStatus.FORBIDDEN)
    }

    return this.matchRepository.update(matchId, { status: MatchStatus.DECLINED })
  }
}
