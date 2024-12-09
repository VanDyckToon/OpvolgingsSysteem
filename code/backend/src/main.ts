import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('De sprong')
    .setDescription("Hier komen al onze API's in te staan")
    .setVersion('1.0')
    .addTag('De Sprong')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
