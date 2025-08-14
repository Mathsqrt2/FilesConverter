import { NestFactory } from '@nestjs/core';
import { AudioConverterModule } from './audio-converter.module';

async function bootstrap() {
  const app = await NestFactory.create(AudioConverterModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
