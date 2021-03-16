import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CustomBaseEntity } from "../../../base-entity";
import { Column, Entity } from "typeorm";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('countries')
export class Countrie extends CustomBaseEntity {

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
}
