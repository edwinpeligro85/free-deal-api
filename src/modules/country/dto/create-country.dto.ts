import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCountryDto {
  @ApiProperty({ type: 'string', example: 'Colombia' })
  @IsString()
  @MaxLength(100)
  name: string;
}
