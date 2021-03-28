import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { Configuration } from "src/config/config.keys";
import { EnvironmentDataBase } from "src/interfaces/environmentDataBase.interface";

export const databaseProvider = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (_config: ConfigService) => {
            const database = _config.get<EnvironmentDataBase>(Configuration.DATABASE);
            const production = _config.get(Configuration.PRODUCTION) === 'true';
      
            return {
                ssl: production,
                type: 'mysql',
                host: database.host,
                port: database.port,
                username: database.username,
                password: database.password,
                database: database.name,
                autoLoadEntities: true,
                entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
                migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
                synchronize: !production,
                logging: ['error', 'schema', 'migration'],
                logger: 'file'
            };
        }
    }),
]