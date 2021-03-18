import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { CountryModule } from './country/country.module';
import { LocationModule } from './location/location.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    AddressModule,
    LocationModule,
    CountryModule,
    StateModule,
    CityModule,
  ],
})
export class LocateModule {}
