import { Module } from '@nestjs/common';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CompanyModule,
    BranchOfficeModule,
    EmployeeModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
  ],
})
export class MerchantModule {}
