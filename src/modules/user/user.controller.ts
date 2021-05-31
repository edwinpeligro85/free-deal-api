import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'deleteOneBase', 'updateOneBase'],
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

  @Get('/orders')
  @Auth({
    resource: AppResource.USER,
    action: 'read',
    possession: 'own',
  })
  findAllOrder(@Request() req) {
    const user: User = req.user;
    return this.service.orders(user);
  }
}
