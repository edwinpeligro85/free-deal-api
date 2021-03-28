import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Direcciones')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @Req() req: any
  ) {
    return this.addressService.create(createAddressDto, req?.ip);
  }

  @Get()
  @Auth({
    resource: AppResource.ADDRESS,
    action: 'read',
    possession: 'any'
  })
  findAll() {
    return this.addressService.findAll();
  }

  @Auth({
    resource: AppResource.ADDRESS,
    action: 'read',
    possession: 'own'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);

    if (!address) return new BadRequestException(`No hay dirección con el id ${id}`);

    return address;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req: any
  ) {
    return this.addressService.update(+id, updateAddressDto, req?.ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
