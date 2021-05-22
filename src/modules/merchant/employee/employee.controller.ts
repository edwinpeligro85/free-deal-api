import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';

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
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.employeeService.findAll(+id);
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
