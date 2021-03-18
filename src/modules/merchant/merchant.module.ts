import { Module } from '@nestjs/common';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CompanyModule, BranchOfficeModule],
})
export class MerchantModule {}
