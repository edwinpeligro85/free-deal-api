import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsBoolean, IsCurrency, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Status } from '../../../../common/enums/status.enum';

export class CreateModifierDto {
  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  groupId: number;

  @ApiProperty({ type: 'string', example: 'Chocolate' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(45, { always: true })
  name: string;

  @ApiProperty({ type: 'number', example: 1000, default: 0 })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE, CrudValidationGroups.CREATE] })
  @IsDecimal()
  @IsCurrency()
  price: number;

  @ApiProperty({ type: 'number', example: false, default: false })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE, CrudValidationGroups.CREATE] })
  @IsBoolean()
  multiple: boolean;

  @ApiProperty({ type: 'number', example: 1, default: 1, enum: Status })
  @IsOptional()
  @IsInt()
  status: number;
}
