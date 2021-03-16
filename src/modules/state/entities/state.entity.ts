import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt
} from 'class-validator';
import { CustomBaseEntity } from 'src/base-entity';
import { Country } from 'src/modules/country/entities/country.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('states')
export class State extends CustomBaseEntity {
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @IsNotEmpty({
    groups: [CrudValidationGroups.CREATE, CrudValidationGroups.UPDATE],
  })
  @IsInt({ always: true })
  @Column({ nullable: false })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.states, { nullable: false })
  country: Country;
}
