import { MicroserviceOptions } from '@nestjs/microservices';
import { VideoConverterModule } from './video-converter.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VideoConverterModule);
  await app.listen();

}

bootstrap();
