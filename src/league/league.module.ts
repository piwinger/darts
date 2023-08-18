import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { League } from './entities/league.entity';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([League]),
    PlayerModule
  ],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService]
})
export class LeagueModule {}
