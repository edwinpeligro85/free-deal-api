import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsInt, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateBranchOfficeDto {
  @ApiProperty({
    required: true,
    maxLength: 45,
    example: 'Sede Pereira',
  })
  businessName: string;

  @ApiProperty({
    description: 'Id de Usuario administrador',
    example: 1,
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE, CrudValidationGroups.UPDATE],
  })
  @IsInt()
  adminId?: number;

  @ApiProperty({
    description: 'Id de la empresa principal',
    example: 1,
  })
  @IsInt()
  companyId: number;

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
    description: 'Id de la Dirección de la empresa',
    example: 1,
  })
  @IsOptional({
    groups: [CrudValidationGroups.CREATE],
  })
  @IsInt()
  addressId?: number;
}
