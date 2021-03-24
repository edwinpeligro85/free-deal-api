import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { Auth } from 'src/common/decorators/auth.decorator';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  routes: {
    only: [
      'createOneBase',
      'getOneBase',
      'getManyBase',
      'deleteOneBase',
      'updateOneBase',
    ],
    updateOneBase: {
      returnShallow: false,
    },
    getOneBase: {
      decorators: [Auth()],
    },
  },
})
@ApiTags('Usuarios')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public readonly service: UserService) {}
}
