import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class Category extends AuditableEntity {
  @Column({ name: 'parent_id', type: 'int', default: 0, nullable: true })
  parentId: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status: Status;

  categories?: Category[];
}
