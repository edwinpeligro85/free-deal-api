import { AuditableEntity } from 'src/base-entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { CompanyBase } from '../../company/entities/company-base.entity';
import { OrderRemark } from './order-remark.entity';

@Entity('orders')
export class Order extends AuditableEntity {
  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => User, user => user.orders)
  customer: User;

  @ManyToOne(() => CompanyBase, company => company.orders)
  company: CompanyBase;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column({ name: 'sub_total', type: 'double', default: 0.0 })
  subTotal: number;

  @Column({ type: 'double', default: 0.0 })
  total: number;

  @OneToMany(() => OrderRemark, (remark) => remark.order, { cascade: true, eager: true })
  remarks!: OrderRemark[];
}
