import { Test, TestingModule } from '@nestjs/testing';
import { SubgroepController } from './subgroep.controller';
import { SubgroepService } from './subgroep.service';

describe('SubgroepController', () => {
  let controller: SubgroepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgroepController],
      providers: [SubgroepService],
    }).compile();

    controller = module.get<SubgroepController>(SubgroepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
