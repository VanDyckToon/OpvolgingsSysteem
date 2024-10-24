import { Test, TestingModule } from '@nestjs/testing';
import { TechnischeCompetentieController } from './technische-competentie.controller';
import { TechnischeCompetentieService } from './technische-competentie.service';

describe('TechnischeCompetentieController', () => {
  let controller: TechnischeCompetentieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnischeCompetentieController],
      providers: [
        TechnischeCompetentieService,
        { provide: TechnischeCompetentieService, useValue: {} },
      ],
    }).compile();

    controller = module.get<TechnischeCompetentieController>(
      TechnischeCompetentieController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
