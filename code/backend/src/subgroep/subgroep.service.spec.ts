import { Test, TestingModule } from '@nestjs/testing';
import { SubgroepService } from './subgroep.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subgroep } from './entities/subgroep.entity';

describe('SubgroepService', () => {
  let service: SubgroepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubgroepService,
        {
          provide: getRepositoryToken(Subgroep),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SubgroepService>(SubgroepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
