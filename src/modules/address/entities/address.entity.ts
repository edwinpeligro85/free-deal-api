import { User } from "src/modules/user/entities/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { MainRoad, PropertyType } from "../enums";

@Entity('addresses')
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'main_road', type: 'enum', enum: MainRoad })
    mainRoad: MainRoad;

    @Column({ name: 'number_main_road', type: 'int' })
    numberMainRoad: number;

    @Column({ name: 'side_line', type: 'int' })
    sideLine: number;

    @Column({ type: 'int' })
    site: number;

    @Column({ name: 'full_address', type: 'varchar', length: 255, nullable: true })
    fullAddress: string;

    @Column({ type: 'varchar', length: 45, nullable: true })
    neighborhood: string;

    @Column({ name: 'property_type', type: 'enum', enum: PropertyType })
    propertyType: PropertyType;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone: string;

    @Column({ name: 'person_name', type: 'varchar', length: 55 })
    personName: string;

    @ManyToOne( () => User, user => user.id )
    owner: User;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
