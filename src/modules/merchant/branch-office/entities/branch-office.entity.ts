import { CustomBaseEntity } from 'src/base-entity';
import { Address } from 'src/modules/locate/address/entities/address.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity('branch_offices')
export class BranchOffice extends CustomBaseEntity {

  @OneToOne(() => Address, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  address?: Address;

  @Column({ name: 'business_phone', type: 'varchar', length: 15, nullable: true })
  businessPhone?: string;

  @OneToOne(() => User, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  administrator: User;

  @ManyToOne(() => Company, (company) => company.branchOffices, {
    nullable: false,
  })
  company: Company;
}
