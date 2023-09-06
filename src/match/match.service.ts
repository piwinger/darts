import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { LeagueService } from 'src/league/league.service';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private usersService: UsersService,
    private playerService: PlayerService,
    private leagueService: LeagueService,
  ) {}

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
    console.log(opponent);

    const league = await this.leagueService.findOne(
      createMatchDto.leagueId,
      false,
    );

    console.log(league);

    const challenger = await this.usersService.findOne({ id: challengerId });
    return this.matchRepository.save(
      this.matchRepository.create({
        challenger: challenger!,
        opponent: opponent,
        league: league,
      }),
    );
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

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    //ToDo: check if allowed
    const update = await this.matchRepository.update(id, updateMatchDto);
    if (update.affected == 0) {
      throw new HttpException(
        `Match with id ${id} could not be updated`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.findOne(id);
  }

  getMatchesForPlayer(userId: number) {
    return this.matchRepository.find({
      where: [{ opponent: { id: userId } }, { challenger: { id: userId } }],
    });
  }

  remove(id: number) {
    return this.matchRepository.softDelete(id);
  }

  calculatePoints(points: number, opponentPoints: number) {
    return points > opponentPoints ? 10 : -10;
  }
}
