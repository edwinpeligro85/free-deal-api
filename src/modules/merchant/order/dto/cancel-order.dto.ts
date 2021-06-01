import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CancelOrderDto {
  @ApiProperty({ type: 'number', example: 1, default: 1 })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsInt()
  orderId: number;

  @ApiProperty({
    type: 'string',
    example: 'No hay Stock.',
  })
  @IsString({ always: true })
  remark: string;
}
