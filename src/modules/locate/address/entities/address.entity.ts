import { AuditableEntity } from 'src/base-entity';
import { Location } from 'src/modules/locate/location/entities/location.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { MainRoad, PropertyType } from '../enums';

@Entity('addresses')
export class Address extends AuditableEntity {
  @Column({ name: 'main_road', type: 'enum', enum: MainRoad })
  mainRoad: MainRoad;

  @Column({ name: 'number_main_road', type: 'int' })
  numberMainRoad: number;

  @Column({ name: 'side_line', type: 'int' })
  sideLine: number;

  @Column({ type: 'int', nullable: true })
  site: number;

  @Column({
    name: 'full_address',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  fullAddress: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  neighborhood: string;

  @Column({
    name: 'property_type',
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.Casa,
  })
  propertyType: PropertyType;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'person_name', type: 'varchar', length: 55, nullable: true })
  personName: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  owner?: User;

  @OneToOne(() => City, { cascade: true, eager: true })
  @JoinColumn()
  city: City;

  @OneToOne(() => Location, { cascade: true, eager: true })
  @JoinColumn()
  location: Location;
}
