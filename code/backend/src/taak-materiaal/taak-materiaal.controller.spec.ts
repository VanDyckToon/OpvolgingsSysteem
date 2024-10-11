import { Test, TestingModule } from '@nestjs/testing';
import { TaakMateriaalController } from './taak-materiaal.controller';
import { TaakMateriaalService } from './taak-materiaal.service';

describe('TaakMateriaalController', () => {
  let controller: TaakMateriaalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaakMateriaalController],
      providers: [TaakMateriaalService],
    }).compile();

    controller = module.get<TaakMateriaalController>(TaakMateriaalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
