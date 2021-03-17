import { BadRequestException, Injectable } from '@nestjs/common';
import { lookup } from 'fast-geoip';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>
  ) {}

  async create(ip: string) {
    const temIp = ip === '::1' ? '191.102.196.160' : ip;
    const ipInfo = await lookup(temIp);
    const location = Object.assign(new Location(), ipInfo);
    
    location.ip = ip;
    location.latitude = ipInfo.ll[0];
    location.longitude = ipInfo.ll[1];

    return await this.repository.save(location as Location);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const location = await this.repository.findOne(id);

    if (!location) return new BadRequestException(`No hay geolocalización con el id ${id}`);

    return location;
  }

  async update(id: number, ip: string) {
    const ipInfo = await lookup(ip);
    const location = Object.assign(new Location(), ipInfo);
    
    location.id = id;
    location.ip = ip;
    location.latitude = ipInfo.ll[0];
    location.longitude = ipInfo.ll[1];

    return await this.repository.save(location as Location);
  }

  async remove(id: number) {
    return await this.repository.softDelete(id);
  }
}
