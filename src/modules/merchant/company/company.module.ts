import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { AddressModule } from 'src/modules/locate/address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UserModule, AddressModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
