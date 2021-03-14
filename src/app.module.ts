import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

import { FeactureModules } from './modules';
import { LocationModule } from './modules/location/location.module';
import { OnDeleteItemEvent } from './common/events/on-delete-item.event';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      expandVariables: true
    }),
    DatabaseModule,
    ...FeactureModules,
    LocationModule
  ],
  controllers: [AppController],
  providers: [AppService, OnDeleteItemEvent],
})
export class AppModule {}
