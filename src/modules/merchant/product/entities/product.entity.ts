import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Category } from '../../category/entities/category.entity';
import { ModifierGroup } from './modifier-group.entity';

@Entity('products')
export class Product extends AuditableEntity {
  @Column({ type: 'varchar', length: '45' })
  name: string;

  @Column({ name: 'full_name', type: 'varchar', length: '64' })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ModifierGroup, (modifierGroup) => modifierGroup.product)
  modifierGroups: ModifierGroup[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.products)
  branchOffice: BranchOffice;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status: Status;
}
