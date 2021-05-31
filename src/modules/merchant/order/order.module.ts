import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRemark } from './entities/order-remark.entity';
import { Order } from './entities/order.entity';
import { CompanyBase } from '../company/entities/company-base.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderRemark, CompanyBase]), CartModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
