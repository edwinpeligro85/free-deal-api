import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AppResource } from 'src/app.roles';
import { Status } from 'src/common/enums/status.enum';

export class CreateProductDto {
  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  ownerId: number;

  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  categoryId: number;

  // entityId: number;

  // entityType: string;

  @ApiProperty({
    type: 'string',
    examples: [AppResource.COMPANY, AppResource.BRANCH_OFFICE],
    default: AppResource.COMPANY,
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  entity: AppResource.COMPANY | AppResource.BRANCH_OFFICE;

  @ApiProperty({ type: 'string', example: 'Cucurucho' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(45, { always: true })
  name: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString({ always: true })
  @MaxLength(64, { always: true })
  fullName?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString({ always: true })
  description: string;

  //   @OneToMany(() => ModifierGroup, (modifierGroup) => modifierGroup.product)
  //   modifierGroups: ModifierGroup[];

  //   @ManyToOne(() => Category, (category) => category.products, { eager: true })
  //   category: Category;

  @ApiProperty({ type: 'number', example: 1, default: 1, enum: Status })
  @IsOptional()
  @IsInt()
  status: Status;
}
