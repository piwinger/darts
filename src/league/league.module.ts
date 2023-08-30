import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { PlayerModule } from 'src/player/player.module';
import { EloRankingService } from 'src/elo-ranking/elo-ranking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([League]),
    PlayerModule,
  ],
  controllers: [LeagueController],
  providers: [LeagueService, EloRankingService],
  exports: [LeagueService]
})
export class LeagueModule {}
