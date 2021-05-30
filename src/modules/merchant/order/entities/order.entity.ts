import { AuditableEntity } from 'src/base-entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';

@Entity('orders')
export class Order extends AuditableEntity {
  @OneToOne(() => Cart, { cascade: true, nullable: true })
  @JoinColumn()
  cart: Cart;
}
