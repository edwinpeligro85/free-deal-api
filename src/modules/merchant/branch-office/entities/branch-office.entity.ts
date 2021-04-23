import { ChildEntity, ManyToOne } from 'typeorm';
import { CompanyBase } from '../../company/entities/company-base.entity';
import { Company } from '../../company/entities/company.entity';
@ChildEntity()
export class BranchOffice extends CompanyBase {
  @ManyToOne(() => Company, (company) => company.branchOffices, {
    nullable: true,
  })
  company: Company;
}
