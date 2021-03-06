import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Crud({
  model: {
    type: City,
  },
  dto: {
    create: CreateCityDto,
    update: UpdateCityDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        Auth({
          resource: AppResource.CITY,
          action: 'create',
          possession: 'any',
        }),
      ],
    },
    updateOneBase: {
      decorators: [
        Auth({
          resource: AppResource.CITY,
          action: 'update',
          possession: 'any',
        }),
      ],
    },
    deleteOneBase: {
      decorators: [
        Auth({
          resource: AppResource.CITY,
          action: 'delete',
          possession: 'any',
        }),
      ],
    },
  }
})
@ApiTags('Ciudades')
@Controller('city')
export class CityController implements CrudController<City> {
  constructor(public readonly service: CityService) {}
}
