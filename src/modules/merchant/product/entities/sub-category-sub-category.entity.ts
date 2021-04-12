import { CustomBaseEntity } from "src/base-entity";
import { Entity, ManyToOne } from "typeorm";
import { SubCategory } from "./sub-category.entity";

@Entity('sub_category_sub_category')
export class SubCategorySubCategory extends CustomBaseEntity {
    
    @ManyToOne(() => SubCategory, subCategory => subCategory.mainSubCategorie)
    mainSubCategorie: SubCategory;

    @ManyToOne(() => SubCategory, subCategory => subCategory.subCategorie)
    subCategorie: SubCategory;
}
