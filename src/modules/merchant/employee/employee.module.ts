import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { CompanyModule } from '../company/company.module';
import { CompanyBase } from '../company/entities/company-base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CompanyBase]), UserModule, CompanyModule],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
