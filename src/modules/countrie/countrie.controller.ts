import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CountrieService } from './countrie.service';
import { CreateCountrieDto } from './dto/create-countrie.dto';
import { UpdateCountrieDto } from './dto/update-countrie.dto';
import { Countrie } from './entities/countrie.entity';

@Crud({
  model: {
    type: Countrie,
  },
  dto: {
    create: CreateCountrieDto,
    update: UpdateCountrieDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase'],
  },
})
@ApiTags('Paises')
@Controller('countrie')
export class CountrieController implements CrudController<Countrie> {
  constructor(public readonly service: CountrieService) {}
}
