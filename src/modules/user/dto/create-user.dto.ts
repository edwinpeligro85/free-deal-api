import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  NotEquals,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 45,
    example: 'Jhon',
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @MaxLength(45, { always: true })
  @IsString({ always: true })
  firstName: string;

  @ApiProperty({
    maxLength: 45,
    example: 'Doe',
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsString({ always: true })
  @MaxLength(45, { always: true })
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

  @ApiProperty({
    required: false,
    minLength: 6,
    maxLength: 15,
    example: '3131313131',
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE, CrudValidationGroups.UPDATE],
  })
  @IsPhoneNumber('CO')
  phone?: string;

  @ApiProperty({
    required: false,
    maxLength: 15,
    example: '91111111',
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE, CrudValidationGroups.UPDATE],
  })
  @IsNumberString()
  dni?: string;

  @ApiProperty({
    enum: UserRole,
    required: true,
    maxLength: 15,
    example: UserRole.CUSTOMER,
  })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @NotEquals(null)
  @IsEnum(UserRole, { always: true })
  role: string;
}
