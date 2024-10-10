import { Test, TestingModule } from '@nestjs/testing';
import { CompetentieService } from './competentie.service';

describe('CompetentieService', () => {
  let service: CompetentieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetentieService],
    }).compile();

    service = module.get<CompetentieService>(CompetentieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
