import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({ type: 'string', example: 'Chocó' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ type: 'number', example: 1 })
  countryId: number;
}
