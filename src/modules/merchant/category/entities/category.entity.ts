import {
  ApiExtraModels,
  ApiHideProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Entity('categories')
@Tree('closure-table')
export class Category extends AuditableEntity {
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status?: Status;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Category),
    },
  })
  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @ApiHideProperty()
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
