import { EnvironmentDataBase } from './environmentDataBase.interface';

export interface Environments {
  port: number;
  production: boolean;
  database: EnvironmentDataBase;
  apiPrefix: string;
  jwtSecret: string;
}
