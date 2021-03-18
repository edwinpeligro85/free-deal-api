import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserLastPageDto {
  @ApiProperty({
    example: '/user',
    maxLength: 192
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(192)
  lastPage: string;
}
