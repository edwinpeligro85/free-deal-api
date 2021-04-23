import { AuditableEntity } from 'src/base-entity';
import { Status } from 'src/common/enums/status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ModifierGroup } from './modifier-group.entity';

@Entity('modifiers')
export class Modifier extends AuditableEntity {
  @Column({ type: 'varchar', length: '45' })
  name: string;

  @Column({ type: 'double', default: 0 })
  price: number;

  @ManyToOne(() => ModifierGroup, (modifierGroup) => modifierGroup.modifiers)
  modifierGroup: ModifierGroup;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    comment: '1:Active, 0:Inactive',
    nullable: true,
  })
  status: Status;
}
