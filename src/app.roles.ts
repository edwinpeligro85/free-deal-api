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
  BRANCH_OFFICE = 'branch_offices',
  PRODUCTS = 'products',
  EMPLOYEE = 'employees',
  ORDER = 'orders'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRole.CUSTOMER)
    .readAny([AppResource.COUNTRY, AppResource.STATE, AppResource.CITY, AppResource.COMPANY])
    .readOwn([AppResource.ADDRESS, AppResource.LOCATION, AppResource.USER])
    .createOwn(AppResource.ADDRESS)
  .grant(UserRole.ADMINISTRATOR)
    .extend(UserRole.CUSTOMER)
    .createOwn([AppResource.EMPLOYEE])
    .readOwn([AppResource.COMPANY, AppResource.BRANCH_OFFICE, AppResource.EMPLOYEE])
    .updateOwn([AppResource.ADDRESS])
  .grant(UserRole.MERCHANT)
    .extend(UserRole.ADMINISTRATOR)
    .createOwn([AppResource.COMPANY, AppResource.BRANCH_OFFICE, AppResource.ADDRESS])
  .grant(UserRole.SUPER_USER)
    .extend(UserRole.MERCHANT)
    .create([AppResource.COUNTRY, AppResource.STATE, AppResource.CITY])