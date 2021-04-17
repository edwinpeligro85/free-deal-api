import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends CrudHelper<Category> {
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }

  async getCategoryTree($parentId?: number) {
    const categories = await this.find({ where: { parentId: $parentId ?? 0, status: 1 }, order: { name: 'ASC' } });

    if (categories?.length > 0) {
      for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        categories[index].categories = await this.getCategoryTree(category.id);
      }
    }

    return categories;
  }
}
