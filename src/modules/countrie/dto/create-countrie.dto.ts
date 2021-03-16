import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCountrieDto {
  @ApiProperty({ type: 'string', example: 'Bananas' })
  @IsString()
  @MaxLength(100)
  name: string;
}
