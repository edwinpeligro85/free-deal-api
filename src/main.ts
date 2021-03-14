import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Configuration } from './config/config.keys';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _config = app.get(ConfigService);
  const logger = new Logger();

  app.setGlobalPrefix(_config.get(Configuration.API_PREFIX));

  // Swagger Documentation API
  const config = new DocumentBuilder()
    .setTitle('Free Deail')
    .setDescription('Esta es una API para la logistica de domicilios, ventas y demás.')
    .setVersion('1.0')
    .addTag('delivery, free deal, foods, merchant products, market free')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(_config.get(Configuration.PORT));
  
  logger.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();
