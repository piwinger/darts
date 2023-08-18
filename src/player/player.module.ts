import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    UsersModule,
  ],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
