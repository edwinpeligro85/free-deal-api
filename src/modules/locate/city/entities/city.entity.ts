import { AuditableEntity } from 'src/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { State } from '../../state/entities/state.entity';

@Entity('cities')
export class City extends AuditableEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ nullable: false })
  stateId: number;

  @ManyToOne(() => State, (state) => state.cities, { nullable: false })
  state: State;
}
