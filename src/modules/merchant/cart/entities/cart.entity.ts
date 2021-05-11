import { AuditableEntity } from 'src/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductToCart } from './products-to-cart.entity';

@Entity('carts')
export class Cart extends AuditableEntity {
  @Column({ type: 'varchar', length: 45 })
  name: string;

  @OneToMany(() => ProductToCart, (productsToCart) => productsToCart.cart, {
    eager: true,
  })
  items!: ProductToCart[];
}
