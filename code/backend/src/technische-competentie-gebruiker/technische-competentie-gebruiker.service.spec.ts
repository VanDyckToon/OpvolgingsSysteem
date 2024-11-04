import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieGebruikerService } from './technische-competentie-gebruiker.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TechnischeCompetentieGebruiker } from './entities/technische-competentie-gebruiker.entity';

describe('TechnischeCompetentieGebruikerService', () => {
  let service: TechnischeCompetentieGebruikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnischeCompetentieGebruikerService,
        {
          provide: getRepositoryToken(TechnischeCompetentieGebruiker),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TechnischeCompetentieGebruikerService>(
      TechnischeCompetentieGebruikerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
