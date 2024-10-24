import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieGebruikerController } from './technische-competentie-gebruiker.controller';
import { TechnischeCompetentieGebruikerService } from './technische-competentie-gebruiker.service';

describe('TechnischeCompetentieGebruikerController', () => {
  let controller: TechnischeCompetentieGebruikerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnischeCompetentieGebruikerController],
      providers: [
        TechnischeCompetentieGebruikerService,
        { provide: TechnischeCompetentieGebruikerService, useValue: {} },
      ],
    }).compile();

    controller = module.get<TechnischeCompetentieGebruikerController>(
      TechnischeCompetentieGebruikerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
