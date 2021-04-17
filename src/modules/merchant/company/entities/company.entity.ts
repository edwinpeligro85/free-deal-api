import { AuditableEntity } from 'src/base-entity';
import { Address } from 'src/modules/locate/address/entities/address.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('companies')
export class Company extends AuditableEntity {

  @Column({ name: 'business_name', type: 'varchar', length: 192 })
  businessName: string;

  @Column({ name: 'business_phone', type: 'varchar', length: 15, nullable: true })
  businessPhone?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nit?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand?: string;

  @OneToOne(() => Address, { cascade: true, eager: true, nullable: true})
  @JoinColumn()
  address?: Address;

  @OneToOne(() => User)
  @JoinColumn()
  manager: User;

  @OneToOne(() => User)
  @JoinColumn()
  administrator: User;

  @OneToMany(() => BranchOffice, (branchOffice) => branchOffice.company, {
    cascade: true,
    eager: true,
  })
  branchOffices: BranchOffice[];

  @OneToMany(() => Employee, (employee) => employee.company, {
    cascade: true,
    eager: true,
  })
  employees: Employee[];
}
