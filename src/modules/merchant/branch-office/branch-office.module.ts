import { Module } from '@nestjs/common';
import { BranchOfficeService } from './branch-office.service';
import { BranchOfficeController } from './branch-office.controller';
import { BranchOffice } from './entities/branch-office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { UserModule } from 'src/modules/user/user.module';
import { AddressModule } from 'src/modules/locate/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchOffice]),
    CompanyModule,
    UserModule,
    AddressModule
  ],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService]
})
export class BranchOfficeModule {}
