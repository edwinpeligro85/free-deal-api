import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { CompanyBase } from '../../company/entities/company-base.entity';
import { ModifierGroup } from './modifier-group.entity';

@Entity('products')
export class Product extends AuditableEntity {
  @Column()
  entityId: number;

  @Column()
  entityType: string;

  @Column({ type: 'varchar', length: '45' })
  name: string;

  @Column({ name: 'full_name', type: 'varchar', length: '64', nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'double', default: 0 })
  price: number;

  @OneToMany(() => ModifierGroup, (modifierGroup) => modifierGroup.product, { eager: true })
  modifierGroups: ModifierGroup[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToOne(() => CompanyBase, (company) => company.products)
  company: CompanyBase;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status: Status;
}
