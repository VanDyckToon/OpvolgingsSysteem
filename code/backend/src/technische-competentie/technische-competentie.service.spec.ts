import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieService } from './technische-competentie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TechnischeCompetentie } from './entities/technische-competentie.entity';

describe('TechnischeCompetentieService', () => {
  let service: TechnischeCompetentieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnischeCompetentieService,
        { provide: getRepositoryToken(TechnischeCompetentie), useValue: {} },
      ],
    }).compile();

    service = module.get<TechnischeCompetentieService>(
      TechnischeCompetentieService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
