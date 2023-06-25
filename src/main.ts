import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any properties that don't have a matching DTO
      forbidNonWhitelisted: true, // This will throw an error if there are properties that don't have a matching DTO
      transform: true, // This will transform the incoming data to the DTO type
    })
  );
  await app.listen(3000);
}
bootstrap();
