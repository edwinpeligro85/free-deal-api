import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Modifier } from './modifier.entity';
import { Product } from './product.entity';

@Entity('modifier-groups')
export class ModifierGroup extends AuditableEntity {
  @Column({ type: 'varchar', length: '45' })
  name: string;

  @OneToMany(() => Modifier, (modifier) => modifier.modifierGroup)
  modifiers: Modifier[];

  @ManyToOne(() => Product, (product) => product.modifierGroups)
  product: Product;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status: Status;
}
