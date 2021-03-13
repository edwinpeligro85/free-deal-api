import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Documentation API
  const config = new DocumentBuilder()
    .setTitle('Free Deail')
    .setDescription('Esta es una API para la logistica de domicilios, ventas y demás.')
    .setVersion('1.0')
    .addTag('delivery, free deal, foods, merchant products, market free')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
