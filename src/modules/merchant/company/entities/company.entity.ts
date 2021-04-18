import { User } from 'src/modules/user/entities/user.entity';
import { ChildEntity, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { CompanyBase } from './company-base.entity';

// @Entity('companies')
@ChildEntity()
export class Company extends CompanyBase {

  @Column({ name: 'business_name', type: 'varchar', length: 192 })
  businessName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nit?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand?: string;

  @OneToOne(() => User)
  @JoinColumn()
  manager: User;

  @OneToMany(() => BranchOffice, (branchOffice) => branchOffice.company, {
    cascade: true,
    eager: true,
  })
  branchOffices: BranchOffice[];
}
