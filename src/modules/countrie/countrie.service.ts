import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { Countrie } from './entities/countrie.entity';

@Injectable()
export class CountrieService extends CrudHelper<Countrie> {

  constructor(@InjectRepository(Countrie) repo) {
    super(repo);
  }
}
