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
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: {id: +id} });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.repository.update(id, updatePlayerDto)
  }

  remove(id: number) {
    return this.repository.softDelete(id)
  }
}
