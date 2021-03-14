import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly _user: UserService,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const user = await this._user.findOneById(createAddressDto.owner.id);

    if (!user) return new BadRequestException(`No hay usuario con el id ${createAddressDto.owner.id}`);
    
    return await this.addressRepository.save(createAddressDto);
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: number) {
    return await this.addressRepository.findOne(id);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id);

    if (!address) return new BadRequestException(`No hay dirección con el id ${id}`);

    const editAddress = Object.assign(address, updateAddressDto);

    return await this.addressRepository.save(editAddress);
  }

  async remove(id: number) {
    const address = await this.findOne(id);

    if (!address) return new BadRequestException(`No hay dirección con el id ${id}`);

    return await this.addressRepository.softDelete(id);
  }
}
