import { CustomBaseEntity } from "src/base-entity";
import { Column, Entity } from "typeorm";

@Entity('products')
export class Product extends CustomBaseEntity {
    
    @Column({ name: 'display_name', type: 'varchar', length: '45' })
    displayName: string;

    @Column({ type: 'text', nullable: true })
    description: string;
}
