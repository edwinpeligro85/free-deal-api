import { Company } from '../entities/company.entity';

export class ResponseMeCompanyDto {
  success: boolean;
  result: Company;
}

export class ResponseCreateCompanyDto {
  success: boolean;
  result: Company;
}
