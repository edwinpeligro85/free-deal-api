import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
  },
  routes: {
    only: [
      'createOneBase',
      'getOneBase',
      'getManyBase',
      'deleteOneBase',
      'updateOneBase',
    ],
  },
})
@ApiTags('Categorias')
@ApiExtraModels(CategoryResponseDto)
@Controller('category')
export class CategoryController implements CrudController<Category> {
  constructor(public readonly service: CategoryService) {}

  @Get('tree/:id')
  getTree(@Param('id') id: string) {
    return this.service.getCategoryDescendants(+id, true);
  }

  @Get('chield/:id')
  getChield(@Param('id') id: string) {
    return this.service.getCategoryDescendants(+id, false);
  }

  // @ApiBody({
  //   schema: {
  //     type: 'array',
  //     items: {
  //       $ref: getSchemaPath(Category),
  //     },
  //   },
  // })
  @Get('tree')
  getTreeMains(): Promise<Category[]> {
    return this.service.getCategoryTree();
  }

  @Get('tree/roots')
  getCategoryTreeRoots(): Promise<Category[]> {
    return this.service.getCategoryTreeRoots();
  }
}
