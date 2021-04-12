import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { BaseCompany } from './base-company.entity';

@Entity('companies')
export class Company extends BaseCompany {
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @OneToMany(() => BranchOffice, (branchOffice) => branchOffice.company, {
    cascade: true,
    eager: true,
  })
  branchOffices: BranchOffice[];
}
