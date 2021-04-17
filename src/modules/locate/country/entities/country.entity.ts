import { AuditableEntity } from 'src/base-entity';
import { State } from 'src/modules/locate/state/entities/state.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('countries')
export class Country extends AuditableEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @OneToMany(() => State, (state) => state.country, {
    cascade: ['soft-remove'],
    eager: true,
  })
  states: State[];
}
