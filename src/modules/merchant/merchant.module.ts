import { Module } from '@nestjs/common';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [CompanyModule, BranchOfficeModule, EmployeeModule, ProductModule, CategoryModule, CartModule],
})
export class MerchantModule {}
