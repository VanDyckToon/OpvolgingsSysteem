import { Test, TestingModule } from '@nestjs/testing';
import { OpleidingGebruikerController } from './opleiding-gebruiker.controller';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';

describe('OpleidingGebruikerController', () => {
  let controller: OpleidingGebruikerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpleidingGebruikerController],
      providers: [
        OpleidingGebruikerService,
        { provide: OpleidingGebruikerService, useValue: {} },
      ],
    }).compile();

    controller = module.get<OpleidingGebruikerController>(
      OpleidingGebruikerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
