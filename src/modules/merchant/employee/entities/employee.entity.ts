import { CustomBaseEntity } from 'src/base-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('employees')
export class Employee extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  title: string;

  @Column({ name: 'hire_date', type: 'datetime', nullable: true })
  hireDate: Date;

  @OneToOne(() => User, { cascade: true, nullable: true })
  @JoinColumn()
  me: User;

  @ManyToOne(() => Company, (company) => company.employees, {
    nullable: true,
  })
  company: Company;

  @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.employees, {
    nullable: true,
  })
  branchOffice: BranchOffice;
}
