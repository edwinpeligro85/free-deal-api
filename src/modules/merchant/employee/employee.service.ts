import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>,
    private readonly _user: UserService,
    private readonly _company: CompanyService,
  ) {
  }

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const employee = Object.assign(new Employee(), dto);

    const company = await this._company.findOne(dto.companyId);
    if (!company) return employee;
    employee.company = company;

    const user = await this._user.findOne(dto.userId);
    if (!user) return employee;
    employee.me = user;

    return employee.save();
  }

  findAll(company: number) {
    return this.repo.find({where: {company}});
  }

   async findOne(id: number) {
    return await this.repo.findOneOrFail(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
