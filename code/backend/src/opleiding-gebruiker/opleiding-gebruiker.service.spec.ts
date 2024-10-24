import { Test, TestingModule } from '@nestjs/testing';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OpleidingGebruikerService', () => {
  let service: OpleidingGebruikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpleidingGebruikerService,
        {
          provide: OpleidingGebruikerService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OpleidingGebruikerService>(OpleidingGebruikerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
