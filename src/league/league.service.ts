import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPlayerDto } from './dto/add-player.dt';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { PlayerService } from 'src/player/player.service';
import { EloRankingService } from 'src/elo-ranking/elo-ranking.service';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private repository: Repository<League>,
    private playerService: PlayerService,
    private eloRanking: EloRankingService

  ) { }

  create(createLeagueDto: CreateLeagueDto) {
    return this.repository.save(
      this.repository.create({
        name: createLeagueDto.name,
      }),
    );
  }

  findAll() {
    return this.repository.find({
      relations: { players: true },
    });
  }

  findOne(id: number, withRelations: boolean = true) {
    return this.repository.findOneOrFail({
      where: {
        id: +id,
      },
      relations: { players: withRelations },
      order: { players: { points: 'DESC'}}
    });
  }

  async getLadder(id: number, userId: number) {
    const league = await this.findOne(id);

    const me = league.players.find(player => player.user.id === userId)

    if (me) {
      league.players.forEach(player => {
        if (player.points >= me.points && player.id !== me.id) {
          player.win = this.eloRanking.ifWins(me!.points, player.points);
          player.loss = this.eloRanking.ifLoses(me!.points, player.points);
          player.canBeChallenged = true
        }
      })
    }

    return league
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return `This action updates a #${id} league`;
  }

  remove(id: number) {
    return `This action removes a #${id} league`;
  }

  async addPlayer(id: number, userId: number) {
    const league = await this.repository.findOneOrFail({
      where: {
        id: id,
      }, relations: {
        players: true
      }
    });

    if (league.players.find(player => player.user.id == userId)) {
      throw new HttpException(`Player with id: ${userId} already registered`, HttpStatus.BAD_REQUEST)
    }

    const player = await this.playerService.create(userId)
    if (!player) { throw new HttpException(`No player with id: ${userId}`, HttpStatus.NOT_FOUND) }

    league.players.push(player)

    return this.repository.save(league)
  }
}
