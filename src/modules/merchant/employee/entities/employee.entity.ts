import { AuditableEntity } from 'src/base-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CompanyBase } from '../../company/entities/company-base.entity';

@Entity('employees')
export class Employee extends AuditableEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  title: string;

  @Column({ name: 'hire_date', type: 'datetime', nullable: true })
  hireDate: Date;

  @OneToOne(() => User, { cascade: true, nullable: true })
  @JoinColumn()
  me: User;

  @ManyToOne(() => CompanyBase, (company) => company.employees, {
    nullable: true,
  })
  company: CompanyBase;
}
