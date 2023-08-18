import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { UsersModule } from 'src/users/users.module';
import { LeagueModule } from 'src/league/league.module';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService],
      imports: [UsersModule, LeagueModule ]
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
