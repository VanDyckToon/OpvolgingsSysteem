import { Test, TestingModule } from '@nestjs/testing';
import { OpmerkingService } from './opmerking.service';

describe('OpmerkingService', () => {
  let service: OpmerkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpmerkingService,
        { provide: OpmerkingService, useValue: {} },
      ],
    }).compile();

    service = module.get<OpmerkingService>(OpmerkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
