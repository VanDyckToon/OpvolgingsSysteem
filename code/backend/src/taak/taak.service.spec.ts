import { Test, TestingModule } from '@nestjs/testing';
import { TaakService } from './taak.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Taak } from './entities/taak.entity';

describe('TaakService', () => {
  let service: TaakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaakService,
        { provide: getRepositoryToken(Taak), useValue: {} },
      ],
    }).compile();

    service = module.get<TaakService>(TaakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
