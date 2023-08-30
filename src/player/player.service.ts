import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private repository: Repository<Player>,
    private usersService: UsersService,
  ) {}

  async create(id: number) {
    const user = await this.usersService.findOne({ id: +id });

    return this.repository.save(
      this.repository.create({
        user: user!,
      }),
    );
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
