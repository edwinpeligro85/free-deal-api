import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UseRoles } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Crud({
  model: {
    type: Country,
  },
  dto: {
    create: CreateCountryDto,
    update: UpdateCountryDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [
        Auth(),
        UseRoles({
          resource: AppResource.COUNTRY,
          action: 'create',
          possession: 'any'
        }),
      ],
    },
  },
  query: {
    exclude: ['deletedAt'],
    join: {
      states: {
        eager: true,
        exclude: ['deletedAt'],
      },
      'states.cities': {
        eager: true,
        exclude: ['deletedAt'],
      },
    },
  },
})
@ApiTags('Paises')
@Controller('country')
export class CountryController implements CrudController<Country> {
  constructor(public readonly service: CountryService) {}
}
