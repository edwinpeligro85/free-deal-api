import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsOptional, IsNotEmpty, IsString, MaxLength, IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: 'example@freedeal.com',
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({}, { always: true })
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 20,
    example: '******',
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
