import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieGebruikerService } from './technische-competentie-gebruiker.service';

describe('TechnischeCompetentieGebruikerService', () => {
  let service: TechnischeCompetentieGebruikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnischeCompetentieGebruikerService],
    }).compile();

    service = module.get<TechnischeCompetentieGebruikerService>(TechnischeCompetentieGebruikerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
