import { RolesBuilder } from 'nest-access-control';
import { UserRole } from './modules/user/enums/user-role.enum';

export enum AppResource {
  USER = 'users',
  COUNTRY = 'countries',
  STATE = 'states',
  CITY = 'cities',
  ADDRESS = 'addresses',
  LOCATION = 'locations',
  COMPANY = 'companies',
  BRANCH_OFFICE = 'branch_offices'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRole.CUSTOMER)
    .readAny([AppResource.COUNTRY, AppResource.STATE, AppResource.CITY])
    .readOwn([AppResource.ADDRESS, AppResource.LOCATION, AppResource.USER])
  .grant(UserRole.MERCHANT)
    .extend(UserRole.CUSTOMER)
    .readOwn([AppResource.BRANCH_OFFICE])