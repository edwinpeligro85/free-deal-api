import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CompanyBase } from '../company/entities/company-base.entity';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRemark } from './entities/order-remark.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(CompanyBase)
    private readonly repoCompany: Repository<CompanyBase>,
    private readonly _cart: CartService,
  ) {}

  async create(dto: CreateOrderDto, user: User): Promise<Order> {
    const order = new Order();
    order.cart = await this._cart.findOne(dto.cartId);
    order.company = await this.repoCompany.findOne(dto.companyId);
    order.customer = user;

    return await order.save();
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number): Promise<Order> {
    return await this.repo.findOneOrFail(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async cancelOrder(dto: CancelOrderDto, user: User) {
    const order = await this.findOne(dto.orderId);

    if (order.status === OrderStatus.CANCELLED) {
      return {
        success: false,
        message: 'Order cancelled',
      };
    }

    this.createRemark(dto.remark, order, user);
    order.status = OrderStatus.CANCELLED;

    return await order.save();
  }

  private async createRemark(message: string, order: Order, user: User): Promise<OrderRemark> {
    const orderRemark = new OrderRemark();
    orderRemark.remark = message;
    orderRemark.order = order;
    orderRemark.createdBy = user;

    return await orderRemark.save();
  }
}
