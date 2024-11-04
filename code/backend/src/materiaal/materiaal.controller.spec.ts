import { Test, TestingModule } from '@nestjs/testing';
import { MateriaalController } from './materiaal.controller';
import { MateriaalService } from './materiaal.service';

describe('MateriaalController', () => {
  let controller: MateriaalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaalController],
      providers: [
        MateriaalService,
        { provide: MateriaalService, useValue: {} },
      ],
    }).compile();

    controller = module.get<MateriaalController>(MateriaalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
