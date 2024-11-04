import { Test, TestingModule } from '@nestjs/testing';
import { CompetentieGebruikerService } from './competentie-gebruiker.service';

describe('CompetentieGebruikerService', () => {
  let service: CompetentieGebruikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetentieGebruikerService,
        { provide: CompetentieGebruikerService, useValue: {} },
      ],
    }).compile();

    service = module.get<CompetentieGebruikerService>(
      CompetentieGebruikerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
