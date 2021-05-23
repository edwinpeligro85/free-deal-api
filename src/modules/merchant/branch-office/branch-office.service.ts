import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/modules/locate/address/address.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { CreateBranchOfficeDto } from './dto/create-branch-office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch-office.dto';
import { BranchOffice } from './entities/branch-office.entity';

@Injectable()
export class BranchOfficeService {
  constructor(
    @InjectRepository(BranchOffice) private readonly repo: Repository<BranchOffice>,
    private readonly _user: UserService,
    private readonly _company: CompanyService,
    private readonly _address: AddressService,
  ) {
  }

  async create(dto: CreateBranchOfficeDto) {
    const branchOffice = new BranchOffice();

    const company = await this._company.findOne(dto.companyId);
    if (!company) return branchOffice;
    branchOffice.company = company;

    const admin = await this._user.findOne(dto.adminId);
    if (!admin) return branchOffice;
    branchOffice.administrator = admin;

    const address = await this._address.findOne(dto.addressId);
    if (!address) return branchOffice;
    branchOffice.address = address;

    branchOffice.businessPhone = dto?.businessPhone;

    return await branchOffice.save();
  }

  findAll() {
    return `This action returns all branchOffice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branchOffice`;
  }

  update(id: number, updateBranchOfficeDto: UpdateBranchOfficeDto) {
    return `This action updates a #${id} branchOffice`;
  }

  remove(id: number) {
    return `This action removes a #${id} branchOffice`;
  }

  async getMe(user: User): Promise<BranchOffice> {
    return this.repo.findOneOrFail({ where: { administrator: user.id } });
  }
}
