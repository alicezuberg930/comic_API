import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.urlencoded({ extended: true })); // handles x-www-form-urlencoded and simple FormData
  app.use(express.json()); // handles JSON
  const configService = app.get(ConfigService)
  // set prefix for every endpoint to api/v1
  app.setGlobalPrefix("api/v1", { exclude: [""] })
  // whitelist configured fields and throw error for non whitelisted fields
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  // cors configurations
  app.enableCors({
    origin: '*',
    // origin: "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    // credentials: true,
  })
  await app.listen(4000);
}
bootstrap();
