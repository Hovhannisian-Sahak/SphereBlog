import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

import express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(express.urlencoded({ extended: true }));

  await app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}
bootstrap();
