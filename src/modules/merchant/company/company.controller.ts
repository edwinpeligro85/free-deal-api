import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Response } from 'express';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CustomResponse } from 'src/common/utils/custom-response';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/enums/user-role.enum';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ResponseCreateCompanyDto, ResponseMeCompanyDto } from './dto/response-company.dto';
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
      },
    },
  },
})
@ApiTags('Empresas')
@Controller('company')
export class CompanyController implements CrudController<Company> {
  constructor(public readonly service: CompanyService) {}

  @Post()
  @ApiResponse({status: 201, type: ResponseCreateCompanyDto, description: 'Create Company'})
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

  @Get('/me')
  @ApiResponse({status: 200, type: ResponseMeCompanyDto, description: 'Return Company'})
  @Auth({
    resource: AppResource.COMPANY,
    action: 'read',
    possession: 'any',
  })
  async me(@Res() res: Response, @Request() req) {
    const user: User = req.user;

    if (
      ![UserRole.SUPER_USER, UserRole.MERCHANT, UserRole.ADMINISTRATOR].includes(
        user.role as any,
      )
    ) {
      return CustomResponse.FailedResponse(
        res,
        HttpStatus.FORBIDDEN,
        'company',
      );
    }

    return CustomResponse.SuccessResponse<Company>(
      res,
      HttpStatus.OK,
      await this.service.getMe(user)
    );
  }
}
