import { Test, TestingModule } from '@nestjs/testing';
import { CompetentieGebruikerController } from './competentie-gebruiker.controller';
import { CompetentieGebruikerService } from './competentie-gebruiker.service';

describe('CompetentieGebruikerController', () => {
  let controller: CompetentieGebruikerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetentieGebruikerController],
      providers: [
        CompetentieGebruikerService,
        {
          provide: CompetentieGebruikerService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CompetentieGebruikerController>(
      CompetentieGebruikerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
