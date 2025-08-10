import { VideoConverterModule } from './video-converter.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(VideoConverterModule);
  await app.listen();
}

bootstrap();
