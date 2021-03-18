import { Entity, ManyToOne } from 'typeorm';
import { BaseCompany } from '../../company/entities/base-company.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('branch_offices')
export class BranchOffice extends BaseCompany {
  @ManyToOne(() => Company, (company) => company.branchOffices, {
    nullable: false,
  })
  company: Company;
}
