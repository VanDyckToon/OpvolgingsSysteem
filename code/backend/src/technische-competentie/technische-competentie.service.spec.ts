import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieService } from './technische-competentie.service';

describe('TechnischeCompetentieService', () => {
  let service: TechnischeCompetentieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnischeCompetentieService],
    }).compile();

    service = module.get<TechnischeCompetentieService>(TechnischeCompetentieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
