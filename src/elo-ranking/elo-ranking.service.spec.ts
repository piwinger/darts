import { Test, TestingModule } from '@nestjs/testing';
import { EloRankingService } from './elo-ranking.service';

describe('EloRankingService', () => {
  let service: EloRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EloRankingService],
    }).compile();

    service = module.get<EloRankingService>(EloRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
