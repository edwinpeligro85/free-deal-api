import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Free Deail')
    .setDescription(
      `Esta es una API para la logistica de domicilios, ventas y demás. \n 
      Para generar y descargar un archivo JSON Swagger, navegue a http://{{host}}/docs-json
    `)
    .setVersion('1.0')
    .addTag('delivery, free deal, foods, merchant products, market free')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
