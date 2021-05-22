import { Controller } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ApiTags } from '@nestjs/swagger';
import { State } from './entities/state.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';

@Crud({
  model: {
    type: State,
  },
  dto: {
    create: CreateStateDto,
    update: UpdateStateDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        Auth({
          resource: AppResource.STATE,
          action: 'create',
          possession: 'any',
        }),
      ],
    },
    updateOneBase: {
      decorators: [
        Auth({
          resource: AppResource.STATE,
          action: 'update',
          possession: 'any',
        }),
      ],
    },
    deleteOneBase: {
      decorators: [
        Auth({
          resource: AppResource.STATE,
          action: 'delete',
          possession: 'any',
        }),
      ],
    },
  },
  query: {
    join: {
      cities: {
        eager: true,
      },
    },
  },
})
@ApiTags('Departamentos')
@Controller('state')
export class StateController implements CrudController<State> {
  constructor(public readonly service: StateService) {}
}
