import { Test, TestingModule } from '@nestjs/testing';
import { CountrieController } from './countrie.controller';
import { CountrieService } from './countrie.service';

describe('CountrieController', () => {
  let controller: CountrieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountrieController],
      providers: [CountrieService],
    }).compile();

    controller = module.get<CountrieController>(CountrieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
