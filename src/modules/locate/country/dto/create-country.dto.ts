import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCountryDto {
  @ApiProperty({ type: 'string', example: 'Colombia' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;
}
