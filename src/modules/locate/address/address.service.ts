import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { LocationService } from '../location/location.service';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly _user: UserService,
    private readonly _location: LocationService
  ) {}

  async create(dto: CreateAddressDto, ip?: string) {
    const address = Object.assign(new Address(), dto);

    if (dto.ownerId) {
      const user = await this._user.findOne(dto.ownerId);
      if (!user) return new BadRequestException(`No hay usuario con el id ${dto.ownerId}`);
      address.owner = user;
    }

    const location = await this._location.create( ip );
    address.location = location;
    
    return await address.save();
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: number) {
    return await this.addressRepository.findOne(id);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto, ip?: string) {
    const address = await this.findOne(id);

    if (!address) return new BadRequestException(`No hay dirección con el id ${id}`);

    const editAddress = Object.assign(address, updateAddressDto);

    this._location.update(address.location.id, ip);

    return await this.addressRepository.save(editAddress);
  }

  async remove(id: number) {
    const address = await this.findOne(id);

    if (!address) return new BadRequestException(`No hay dirección con el id ${id}`);

    this._location.remove(address.location.id);

    return await this.addressRepository.softDelete(id);
  }
}
