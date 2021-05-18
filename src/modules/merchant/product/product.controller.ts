import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CreateModifierDto } from './dto/create-modifier.dto';
import { CreateModifierGroupDto } from './dto/create-modifier-group.dto';

@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'deleteOneBase', 'updateOneBase'],
  },
  query: {
    join: {
      category: {
        eager: true,
      },
    }
  },
})
@ApiTags('Productos')
@Controller('product')
export class ProductController implements CrudController<Product> {
  constructor(public readonly service: ProductService) {}

  @Post('/modifier')
  createModifier(
    @Body() createModifierDto: CreateModifierDto,
    @Req() req: any
  ) {
    return this.service.addModifiersByGroupId(createModifierDto);
  }

  @Post('/group')
  createModifierGroup(
    @Body() createModifierGroupDto: CreateModifierGroupDto,
  ) {
    return this.service.createModifierGroup(createModifierGroupDto);
  }

}
