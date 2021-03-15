import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('locations')
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 18 })
    ip: string;

    @Column({ type: 'simple-array' })
    range: number[];

    @Column({ type: 'varchar', length: 3 })
    country: string;

    @Column({ type: 'varchar', length: 3 })
    region: string;

    @Column({ type: 'varchar', length: 45 })
    city: string;

    @Column({ type: 'float' })
    latitude: number;

    @Column({ type: 'float' })
    longitude: number;
    
    @Column({ type: 'int' })
    metro: number;

    @Column({ type: 'int' })
    area: number;

    @Column({ type: 'int', nullable: true})
    zip?: number; 

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
