import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchOfficeService } from './branch-office.service';
import { CreateBranchOfficeDto } from './dto/create-branch-office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch-office.dto';

@Controller('branch-office')
export class BranchOfficeController {
  constructor(private readonly branchOfficeService: BranchOfficeService) {}

  @Post()
  create(@Body() createBranchOfficeDto: CreateBranchOfficeDto) {
    return this.branchOfficeService.create(createBranchOfficeDto);
  }

  @Get()
  findAll() {
    return this.branchOfficeService.findAll();
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
