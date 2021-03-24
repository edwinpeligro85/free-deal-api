import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { Configuration } from './config/config.keys';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _config = app.get(ConfigService);
  const logger = new Logger();

  app.setGlobalPrefix(_config.get(Configuration.API_PREFIX));

  // Swagger Documentation API
  initSwagger(app);

  await app.listen(_config.get(Configuration.PORT));
  
  logger.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();
