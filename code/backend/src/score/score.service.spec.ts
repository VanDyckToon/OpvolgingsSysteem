import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreService,
        {
          provide: getRepositoryToken(Score),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
