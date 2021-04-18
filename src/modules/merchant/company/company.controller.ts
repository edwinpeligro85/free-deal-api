import { Body, Controller, HttpStatus, Post, Request, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Response } from 'express';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CustomResponse } from 'src/common/utils/custom-response';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Crud({
  model: {
    type: Company,
  },
  dto: {
    create: CreateCompanyDto,
    update: UpdateCompanyDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: {
      decorators: [
        Auth({
          resource: AppResource.COMPANY,
          action: 'read',
          possession: 'any',
        }),
      ],
    },
    getManyBase: {
      decorators: [
        Auth({
          resource: AppResource.COMPANY,
          action: 'read',
          possession: 'any',
        }),
      ],
    },
    updateOneBase: {
      decorators: [
        Auth({
          resource: AppResource.COMPANY,
          action: 'update',
          possession: 'own',
        }),
      ],
    },
    deleteOneBase: {
      decorators: [
        Auth({
          resource: AppResource.COMPANY,
          action: 'delete',
          possession: 'own',
        }),
      ],
    },
  },
  query: {
    join: {
      branch_offices: {
        eager: true,
      },
      products: {
        eager: true,
      }
    },
  },
})
@ApiTags('Empresas')
@Controller('company')
export class CompanyController implements CrudController<Company> {
  constructor(public readonly service: CompanyService) {}

  @Post()
  @Auth({
    resource: AppResource.COMPANY,
    action: 'create',
    possession: 'own',
  })
  async create(
    @Res() res: Response,
    @Request() req,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    const create = await this.service.create(createCompanyDto, req.user);

    if (!create.manager)
      return CustomResponse.FailedResponse(
        res,
        HttpStatus.BAD_REQUEST,
        'usuario',
        createCompanyDto.addressId,
      );

    return CustomResponse.SuccessResponse(res, HttpStatus.CREATED, create);
  }
}
