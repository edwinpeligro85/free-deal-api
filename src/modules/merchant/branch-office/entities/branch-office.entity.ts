import { ChildEntity, Entity, ManyToOne } from 'typeorm';
import { CompanyBase } from '../../company/entities/company-base.entity';
import { Company } from '../../company/entities/company.entity';

// @Entity('branch_offices')
@ChildEntity()
export class BranchOffice extends CompanyBase {

  @ManyToOne(() => Company, (company) => company.branchOffices, {
    nullable: true,
  })
  company: Company;

  // @OneToMany(() => Product, (product) => product.branchOffice, { eager: true })
  // products: Product[];
}
