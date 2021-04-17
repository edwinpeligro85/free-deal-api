import { AuditableEntity } from 'src/base-entity';
import { Country } from 'src/modules/locate/country/entities/country.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity('states')
export class State extends AuditableEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ nullable: false })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.states, { nullable: false })
  country: Country;

  @OneToMany(() => City, (city) => city.state, { cascade: true, eager: true })
  cities: City[];
}
