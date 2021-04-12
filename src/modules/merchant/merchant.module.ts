import { Module } from '@nestjs/common';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [CompanyModule, BranchOfficeModule, EmployeeModule],
})
export class MerchantModule {}
