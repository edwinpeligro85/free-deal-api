import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { State } from './entities/state.entity';

@Injectable()
export class StateService extends CrudHelper<State> {
  constructor(@InjectRepository(State) repo) {
    super(repo);
  }
}
