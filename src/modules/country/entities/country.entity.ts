import { CrudValidationGroups } from '@nestjsx/crud';
import { IsOptional, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CustomBaseEntity } from 'src/base-entity';
import { State } from 'src/modules/state/entities/state.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('countries')
export class Country extends CustomBaseEntity {
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @OneToMany(() => State, (state) => state.country, { cascade: true, eager: true })
  states: State[];
}
