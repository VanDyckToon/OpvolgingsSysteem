import { Test, TestingModule } from '@nestjs/testing';
import { CompetentieController } from './competentie.controller';
import { CompetentieService } from './competentie.service';

describe('CompetentieController', () => {
  let controller: CompetentieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetentieController],
      providers: [
        CompetentieService,
        { provide: CompetentieService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CompetentieController>(CompetentieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
