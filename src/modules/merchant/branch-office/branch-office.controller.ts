import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { User } from 'src/modules/user/entities/user.entity';
import { BranchOfficeService } from './branch-office.service';
import { CreateBranchOfficeDto } from './dto/create-branch-office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch-office.dto';

@ApiTags('Sucursales')
@Controller('branch-office')
export class BranchOfficeController {
  constructor(private readonly branchOfficeService: BranchOfficeService) {}

  @Get('/me')
  @Auth({
    resource: AppResource.BRANCH_OFFICE,
    action: 'read',
    possession: 'own',
  })
  async me(@Request() req) {
    const user: User = req.user;

    return await this.branchOfficeService.getMe(user);
  }

  @Post()
  create(@Body() createBranchOfficeDto: CreateBranchOfficeDto) {
    return this.branchOfficeService.create(createBranchOfficeDto);
  }

  @Get('company/:id')
  findAll(@Param('id') id: string) {
    return this.branchOfficeService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchOfficeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchOfficeDto: UpdateBranchOfficeDto) {
    return this.branchOfficeService.update(+id, updateBranchOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchOfficeService.remove(+id);
  }
}
