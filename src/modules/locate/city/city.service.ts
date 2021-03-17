import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { City } from './entities/city.entity';

@Injectable()
export class CityService extends CrudHelper<City> {
  constructor(@InjectRepository(City) repo) {
    super(repo);
  }
}
