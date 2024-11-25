import { Test, TestingModule } from '@nestjs/testing';
import { GebruikerSubgroepController } from './gebruiker-subgroep.controller';
import { GebruikerSubgroepService } from './gebruiker-subgroep.service';

describe('GebruikerSubgroepController', () => {
  let controller: GebruikerSubgroepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GebruikerSubgroepController],
      providers: [GebruikerSubgroepService],
    }).compile();

    controller = module.get<GebruikerSubgroepController>(
      GebruikerSubgroepController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
