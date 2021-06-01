import { AuditableEntity } from 'src/base-entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order-remarks')
export class OrderRemark extends AuditableEntity {
  @ManyToOne(() => Order, (order) => order.remarks, { nullable: false })
  order: Order;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  orderStatus: OrderStatus;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}
