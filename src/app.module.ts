import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

import { FeactureModules } from './modules';
import { OnDeleteItemEvent } from './common/events/on-delete-item.event';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    AccessControlModule.forRoles(roles),
    EventEmitterModule.forRoot(),
    ...FeactureModules,
  ],
  controllers: [AppController],
  providers: [AppService, OnDeleteItemEvent],
})
export class AppModule {}
