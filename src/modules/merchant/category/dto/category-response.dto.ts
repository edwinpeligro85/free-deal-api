import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  deletedAt: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  children: Category[];
}
