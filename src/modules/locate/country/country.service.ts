import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService extends CrudHelper<Country> {

  constructor(@InjectRepository(Country) repo) {
    super(repo);
  }
}
