import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AddPlayerDto } from './dto/add-player.dt';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private repository: Repository<League>,
    private playerService: PlayerService

  ) {}

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
    });
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return `This action updates a #${id} league`;
  }

  remove(id: number) {
    return `This action removes a #${id} league`;
  }

  async addPlayer(id: number, addPlayerDto: AddPlayerDto) {
    const league = await this.repository.findOneOrFail({
      where: {
        id: id,
      }, relations: {
        players: true
      }      
    });

    if(league.players.find(player => player.user.id == addPlayerDto.id)) {
      throw new HttpException(`Player with id: ${addPlayerDto.id} already registered`, HttpStatus.BAD_REQUEST  )
    }

    const player = await this.playerService.create(id)

    if(!player) { throw new HttpException(`No player with id: ${addPlayerDto.id}`, HttpStatus.NOT_FOUND  )}

    league.players.push(player)

    return this.repository.save(league)
  }
}
