import { User } from 'src/modules/user/entities/user.entity';
import { ChildEntity, Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { CompanyBase } from './company-base.entity';

@ChildEntity()
export class Company extends CompanyBase {

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
