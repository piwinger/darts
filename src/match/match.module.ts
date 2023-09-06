import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { UsersModule } from 'src/users/users.module';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueModule } from 'src/league/league.module';
import { PlayerModule } from 'src/player/player.module';
import { EloRankingService } from 'src/elo-ranking/elo-ranking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    UsersModule,
    LeagueModule,
    PlayerModule,
  ],
  controllers: [MatchController],
  providers: [MatchService, EloRankingService]
})
export class MatchModule {}
