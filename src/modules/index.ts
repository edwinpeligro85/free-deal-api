import { AddressModule } from './address/address.module';
import { CountryModule } from './country/country.module';
import { LocationModule } from './location/location.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';

export const FeactureModules = [
    UserModule,
    AddressModule,
    LocationModule,
    CountryModule,
    StateModule
];