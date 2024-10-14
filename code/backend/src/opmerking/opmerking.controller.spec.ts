import { Test, TestingModule } from '@nestjs/testing';
import { OpmerkingController } from './opmerking.controller';
import { OpmerkingService } from './opmerking.service';

describe('OpmerkingController', () => {
  let controller: OpmerkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpmerkingController],
      providers: [OpmerkingService],
    }).compile();

    controller = module.get<OpmerkingController>(OpmerkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
