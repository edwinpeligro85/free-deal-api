import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CompanyBase } from '../company/entities/company-base.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(CompanyBase)
    private readonly repoCompany: Repository<CompanyBase>,
    private readonly _cart: CartService,
  ) {}

  async create(dto: CreateOrderDto, user: User): Promise<Order>{
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
}
