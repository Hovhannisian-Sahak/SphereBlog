import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cors());
  await app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}
bootstrap();
