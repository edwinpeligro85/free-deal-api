import { AuditableEntity } from 'src/base-entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Modifier } from '../../product/entities/modifier.entity';
import { Product } from '../../product/entities/product.entity';
import { Cart } from './cart.entity';

@Entity('products_to_cart')
export class ProductToCart extends AuditableEntity {
  @Column({ type: 'int' })
  quantity!: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @ManyToOne(() => Product, {
    eager: true,
  })
  @JoinColumn()
  product!: Product;

  @ManyToMany(() => Modifier, {
    eager: true,
  })
  @JoinTable()
  modifiers: Modifier[];
}
