import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';
import { ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ApiTags('Empleados')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @ApiResponse({status: 201, type: ResponseCreateCompanyDto, description: 'Create Company'})
  @Auth({
    action: 'create',
    possession: 'own',
    resource: AppResource.EMPLOYEE
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Auth({
    action: 'read',
    possession: 'own',
    resource: AppResource.EMPLOYEE
  })
  @Get('company/:id')
  findAll(@Param('id') id: string) {
    return this.employeeService.findAll(+id);
  }

  @Get('/me')
  @Auth({
    action: 'read',
    possession: 'own',
    resource: AppResource.EMPLOYEE
  })
  async current(@Request() req): Promise<Employee> {
    const user: User = req.user;

    return await this.employeeService.current(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
