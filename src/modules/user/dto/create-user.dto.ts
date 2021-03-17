import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 45,
    example: 'Jhon',
  })
  firstName: string;

  @ApiProperty({
    maxLength: 45,
    example: 'Doe',
  })
  lastName: string;

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
    maxLength: 12,
    example: '****',
  })
  password: string;

  @ApiProperty({
    required: false,
    minLength: 6,
    maxLength: 10,
    example: '3131313131',
  })
  phone?: string;

  @ApiProperty({
    example: 'https://docs.nestjs.com/assets/logo-small.svg',
  })
  avatar: string;
}
