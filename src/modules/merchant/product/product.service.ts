import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { DeepPartial } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CompanyService } from '../company/company.service';
import { AppResource } from 'src/app.roles';
import { BranchOffice } from '../branch-office/entities/branch-office.entity';
import { CrudHelper } from 'src/crud-helper';

@Injectable()
export class ProductService extends CrudHelper<Product> {
  constructor(
    @InjectRepository(Product) repo,
    private readonly _company: CompanyService
  ) {
    super(repo);
  }


  async createOne(req: CrudRequest, dto: DeepPartial<CreateProductDto>): Promise<Product> {
    let entityId: number;
    let entityType: string;

    if (dto.entity === AppResource.COMPANY) {
      entityId = (await this._company.findOne(dto.ownerId)).id;
      entityType = AppResource.COMPANY;
    } else if (dto.entity === AppResource.BRANCH_OFFICE) {
      // TODO: COMPLETAR LOGICA DE LAS SUCURSALES
      entityId = new BranchOffice().id;
      entityType = AppResource.BRANCH_OFFICE;
    } else {
      entityId = entityType = null;
    }

    // Se eliminan atributos inecesarios
    delete dto.ownerId, dto.entity;

    const product = Object.assign(new Product(), dto);
    product.entityId = entityId;
    product.entityType = entityType;

    return await product.save();
  }
}
