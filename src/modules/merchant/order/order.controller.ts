import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';
import { User } from 'src/modules/user/entities/user.entity';
import { Order } from './entities/order.entity';

@ApiTags('Ordenes')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth({
    resource: AppResource.ORDER,
    action: 'create',
    possession: 'own',
  })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req): Promise<Order> {
    const user: User = req.user;

    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
