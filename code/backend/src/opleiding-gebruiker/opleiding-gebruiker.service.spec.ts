import { Test, TestingModule } from '@nestjs/testing';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';

describe('OpleidingGebruikerService', () => {
  let service: OpleidingGebruikerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpleidingGebruikerService],
    }).compile();

    service = module.get<OpleidingGebruikerService>(OpleidingGebruikerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
