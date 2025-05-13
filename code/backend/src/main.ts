import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('De sprong')
    .setDescription("Hier komen al onze API's in te staan")
    .setVersion('1.0')
    .addTag('De Sprong')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [
      'http://desprong.opvolging.com',
      'https://desprong.opvolging.com',
      'http://localhost:5173',
    ], // Allow requests from the frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers
  });

  await app.listen(3000);
}
bootstrap();
