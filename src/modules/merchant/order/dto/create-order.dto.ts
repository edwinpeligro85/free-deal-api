import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsCurrency, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  cartId: number;

  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  companyId: number;

  @ApiProperty({ type: 'number', example: 10000, default: 0 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsCurrency()
  subTotal: number;

  @ApiProperty({ type: 'number', example: 15000, default: 0 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsCurrency()
  total: number;
}
