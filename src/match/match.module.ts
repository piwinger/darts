import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { UsersModule } from 'src/users/users.module';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueModule } from 'src/league/league.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    UsersModule,
    LeagueModule
  ],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
