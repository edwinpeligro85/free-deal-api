import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  NotEquals,
} from 'class-validator';

export class CreateStateDto {
  @ApiProperty({ type: 'string', example: 'Chocó' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({ type: 'number', example: 1 })
  @NotEquals(null)
  @IsNotEmpty({
    groups: [CrudValidationGroups.CREATE],
  })
  @IsInt({ always: true })
  countryId: number;
}
