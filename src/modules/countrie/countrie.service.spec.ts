import { Test, TestingModule } from '@nestjs/testing';
import { CountrieService } from './countrie.service';

describe('CountrieService', () => {
  let service: CountrieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountrieService],
    }).compile();

    service = module.get<CountrieService>(CountrieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
