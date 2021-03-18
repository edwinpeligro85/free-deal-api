import { Injectable } from '@nestjs/common';
import { CreateBranchOfficeDto } from './dto/create-branch-office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch-office.dto';

@Injectable()
export class BranchOfficeService {
  create(createBranchOfficeDto: CreateBranchOfficeDto) {
    return 'This action adds a new branchOffice';
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
}
