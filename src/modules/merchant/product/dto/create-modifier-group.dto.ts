import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateModifierGroupDto {
  @ApiProperty({ type: 'string', example: 'Sabor de helado' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(45, { always: true })
  name: string;

  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  productId: number;
}
