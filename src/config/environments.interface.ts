export interface Environments {
    port: number;
    production: boolean;
    database: EnvironmentDataBase;
    apiPrefix: string;
    jwtSecret: string;
}

export interface EnvironmentDataBase {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
}
