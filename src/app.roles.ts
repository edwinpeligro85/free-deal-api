import { RolesBuilder } from 'nest-access-control';
import { UserRole } from './modules/user/enums/user-role.enum';

export enum AppResource {
  USER = 'users',
  COUNTRY = 'countries',
  STATE = 'states',
  CITY = 'cities',
  ADDRESS = 'addresses',
  LOCATION = 'locations',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRole.CUSTOMER)
    .readAny([AppResource.COUNTRY, AppResource.STATE, AppResource.CITY])
    .readOwn([AppResource.ADDRESS, AppResource.LOCATION, AppResource.USER])