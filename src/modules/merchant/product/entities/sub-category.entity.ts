import { CustomBaseEntity } from "src/base-entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { SubCategorySubCategory } from "./sub-category-sub-category.entity";

@Entity('sub_categories')
export class SubCategory extends CustomBaseEntity {
    
    @Column({ name: 'display_name', type: 'varchar', length: '45' })
    displayName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Category, category => category.subCategories)
    category: Category;

    @OneToMany(() => SubCategorySubCategory, subSub => subSub.mainSubCategorie)
    mainSubCategorie: SubCategorySubCategory;

    @OneToMany(() => SubCategorySubCategory, subSub => subSub.subCategorie)
    subCategorie: SubCategorySubCategory;
}
