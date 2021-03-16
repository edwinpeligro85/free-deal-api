import { Module } from '@nestjs/common';
import { CountrieService } from './countrie.service';
import { CountrieController } from './countrie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countrie } from './entities/countrie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Countrie])],
  controllers: [CountrieController],
  providers: [CountrieService]
})
export class CountrieModule {}
