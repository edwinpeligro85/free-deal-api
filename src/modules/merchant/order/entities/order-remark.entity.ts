import { AuditableEntity } from 'src/base-entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
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
}
