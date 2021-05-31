import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { CompanyBase } from '../company/entities/company-base.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>,
    @InjectRepository(CompanyBase)
    private readonly repoCompany: Repository<CompanyBase>,
    private readonly _user: UserService,
    private readonly _company: CompanyService,
  ) {}

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
    return this.repo.find({ where: { company }, relations: ['company', 'me'] });
  }

  async findOne(id: number) {
    return await this.repo.findOneOrFail(id);
  }

  async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.repo.findOneOrFail(id);
    employee.title = dto.title || employee.title;
    employee.hireDate = dto.hireDate || employee.hireDate;

    if (dto.companyId) {
      employee.company =
        (await this.repoCompany.findOne(dto.companyId)) || employee.company;
    }

    return employee.save();
  }

  async remove(id: number): Promise<Employee> {
    const employee = await this.repo.findOneOrFail(id);
    return employee.softRemove();
  }

  current(user: User): Promise<Employee> {
    return this.repo.findOne({
      where: { me: user.id },
      join: {
        alias: 'employee',
        innerJoinAndSelect: {
          me: 'employee.me',
          company: 'employee.company',
        },
      },
    });
  }
}
