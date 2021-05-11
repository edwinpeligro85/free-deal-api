import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class CreateCategoryDto {
  @ApiProperty({ type: 'number', example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  parentId: number;

  @ApiProperty({ type: 'string', example: 'Helados' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({
    type: 'string',
    example:
      'El helado o crema helada es un alimento congelado que por lo general se hace de productos lácteos tales como leche o crema.',
  })
  @IsOptional()
  @IsString({ always: true })
  description: string;

  @ApiProperty({ type: 'number', example: 1, default: 1, enum: Status })
  @IsOptional()
  @IsInt()
  status: Status;
}
