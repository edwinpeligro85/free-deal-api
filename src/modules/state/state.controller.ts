import { Controller } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ApiTags } from '@nestjs/swagger';
import { State } from './entities/state.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: State,
  },
  dto: {
    create: CreateStateDto,
    update: UpdateStateDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase'],
  },
  // params: {
  //   countryId: {
  //     field: 'countryId',
  //     type: 'number',
  //   },
  // }
})
@ApiTags('Departamentos')
@Controller('state')
export class StateController implements CrudController<State> {
  constructor(public readonly service: StateService) {}
}
