import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { DeepPartial, TreeRepository } from 'typeorm';
import { CrudHelper } from 'src/crud-helper';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends CrudHelper<Category> {

  private treeRepo: TreeRepository<Category>;

  constructor(
    @InjectRepository(Category) repo,
    @InjectEntityManager() manager
  ) {
    super(repo);
    this.treeRepo = manager.getTreeRepository(Category);
  }

  async createOne(req: CrudRequest, dto: DeepPartial<CreateCategoryDto>): Promise<Category> {
    const parent: Category = await this.findOne(dto.parentId ?? 0);

    // Se eliminan atributos inecesarios
    delete dto.parentId;
    
    const category = Object.assign(new Category(), dto);

    if (parent) {
      category.parent = parent;
    }

    return await category.save();
  }

  async getCategoryTree() {
    return await this.treeRepo.findTrees();
  }

  async getCategoryDescendants(id: number, tree: boolean) {
    const parent: Category = await this.findOne(id);

    if (tree) {
      return await this.treeRepo.findDescendantsTree(parent)
    }

    return await this.treeRepo.findDescendants(parent);
  }

  async getCategoryTreeRoots() {
    return await this.treeRepo.findRoots();
  }
}
