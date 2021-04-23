import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CompanyService } from '../company/company.service';
import { AppResource } from 'src/app.roles';
import { BranchOffice } from '../branch-office/entities/branch-office.entity';
import { CrudHelper } from 'src/crud-helper';
import { Modifier } from './entities/modifier.entity';

@Injectable()
export class ProductService extends CrudHelper<Product> {
  private modifierRepo: Repository<Modifier>;

  constructor(
    @InjectRepository(Product) repo,
    @InjectEntityManager() manager,
    private readonly _company: CompanyService,
  ) {
    super(repo);
    this.modifierRepo = manager.getRepository(Modifier);
  }

  async createOne(
    req: CrudRequest,
    dto: DeepPartial<CreateProductDto>,
  ): Promise<Product> {
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
    delete dto.ownerId
    delete dto.entity;

    const product = Object.assign(new Product(), dto);
    product.entityId = entityId;
    product.entityType = entityType;

    return await product.save();
  }

  async getModifiersById(id: number): Promise<Modifier> {
    return await this.modifierRepo.findOne(id, { where: { status: 1 } });
  }
}
