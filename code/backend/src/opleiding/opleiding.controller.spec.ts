import { Test, TestingModule } from '@nestjs/testing';
import { OpleidingController } from './opleiding.controller';
import { OpleidingService } from './opleiding.service';

describe('OpleidingController', () => {
  let controller: OpleidingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpleidingController],
      providers: [OpleidingService],
    }).compile();

    controller = module.get<OpleidingController>(OpleidingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
