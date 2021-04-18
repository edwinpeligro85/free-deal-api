import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsInt, isInt, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCompanyDto {
  // @ApiProperty({
  //   description: 'Id de Usuario a quien pertenece la empresa',
  //   example: 1,
  // })
  // @IsInt()
  // userId: number;

  @ApiProperty({
    required: true,
    maxLength: 192,
    example: 'El Colombiano Hambriento',
  })
  businessName: string;

  @ApiProperty({
    required: false,
    minLength: 6,
    maxLength: 12,
    example: '3131313131',
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE, CrudValidationGroups.UPDATE],
  })
  @IsPhoneNumber('CO')
  businessPhone?: string;

  @ApiProperty({
    required: false,
    minLength: 6,
    maxLength: 15,
    example: '12,449,965-4',
  })
  nit?: string;

  // brand?: string;

  @ApiProperty({
    required: false,
    description: 'Id de la Dirección de la empresa',
    example: 1,
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE],
  })
  @IsInt()
  addressId?: number;
}
