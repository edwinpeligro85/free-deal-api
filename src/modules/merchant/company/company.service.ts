import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { AddressService } from 'src/modules/locate/address/address.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService extends CrudHelper<Company> {
  constructor(
    @InjectRepository(Company) repo,
    private readonly _user: UserService,
    private readonly _address: AddressService,
  ) {
    super(repo);
  }

  async create(dto: CreateCompanyDto, user: User) {
    const company = new Company();

    if (!user) return company;

    const createCompany = Object.assign(company, dto);
    createCompany.manager = user;
    createCompany.administrator = user;

    const address = await this._address.findOne(dto.addressId);
    if (address) {
      createCompany.address = address;
    }

    return await createCompany.save();
  }
}
