import { Module } from '@nestjs/common';
import { BranchOfficeService } from './branch-office.service';
import { BranchOfficeController } from './branch-office.controller';

@Module({
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService]
})
export class BranchOfficeModule {}
