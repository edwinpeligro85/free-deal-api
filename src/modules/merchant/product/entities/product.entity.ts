import { AuditableEntity } from "src/base-entity";
import { Column, Entity } from "typeorm";

@Entity('products')
export class Product extends AuditableEntity {
    
    @Column({ name: 'display_name', type: 'varchar', length: '45' })
    displayName: string;

    @Column({ type: 'text', nullable: true })
    description: string;
}
