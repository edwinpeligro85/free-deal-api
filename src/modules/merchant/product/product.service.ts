import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends CrudHelper<Product> {
  constructor(@InjectRepository(Product) repo) {
    super(repo);
  }
}
