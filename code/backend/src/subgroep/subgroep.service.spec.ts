import { Test, TestingModule } from '@nestjs/testing';
import { SubgroepService } from './subgroep.service';

describe('SubgroepService', () => {
  let service: SubgroepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubgroepService],
    }).compile();

    service = module.get<SubgroepService>(SubgroepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
