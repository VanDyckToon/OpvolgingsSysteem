import { Test, TestingModule } from '@nestjs/testing';
import { TaakMateriaalService } from './taak-materiaal.service';

describe('TaakMateriaalService', () => {
  let service: TaakMateriaalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaakMateriaalService],
    }).compile();

    service = module.get<TaakMateriaalService>(TaakMateriaalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
