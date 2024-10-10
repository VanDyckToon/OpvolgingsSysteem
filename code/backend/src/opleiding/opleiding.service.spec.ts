import { Test, TestingModule } from '@nestjs/testing';
import { OpleidingService } from './opleiding.service';

describe('OpleidingService', () => {
  let service: OpleidingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpleidingService],
    }).compile();

    service = module.get<OpleidingService>(OpleidingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
