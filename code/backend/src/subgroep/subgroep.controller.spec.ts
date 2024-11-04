import { Test, TestingModule } from '@nestjs/testing';
import { SubgroepController } from './subgroep.controller';
import { SubgroepService } from './subgroep.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subgroep } from './entities/subgroep.entity';

describe('SubgroepController', () => {
  let controller: SubgroepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgroepController],
      providers: [
        SubgroepService,
        {
          provide: getRepositoryToken(Subgroep),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SubgroepController>(SubgroepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
