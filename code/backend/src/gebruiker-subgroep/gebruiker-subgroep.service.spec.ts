import { Test, TestingModule } from '@nestjs/testing';
import { GebruikerSubgroepService } from './gebruiker-subgroep.service';

describe('GebruikerSubgroepService', () => {
  let service: GebruikerSubgroepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GebruikerSubgroepService,
        { provide: GebruikerSubgroepService, useValue: {} },
      ],
    }).compile();

    service = module.get<GebruikerSubgroepService>(GebruikerSubgroepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
