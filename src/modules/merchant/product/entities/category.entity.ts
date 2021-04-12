import { CustomBaseEntity } from "src/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { SubCategory } from "./sub-category.entity";

@Entity('categories')
export class Category extends CustomBaseEntity {
    
    @Column({ name: 'display_name', type: 'varchar', length: '45' })
    displayName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => SubCategory, subCategory => subCategory.category)
    subCategories: SubCategory[];
}
