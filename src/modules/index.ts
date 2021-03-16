import { AddressModule } from './address/address.module';
import { CountrieModule } from './countrie/countrie.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

export const FeactureModules = [
    UserModule,
    AddressModule,
    LocationModule,
    CountrieModule
];