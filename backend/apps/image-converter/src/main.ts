import { NestFactory } from '@nestjs/core';
import { ImageConverterModule } from './image-converter.module';

async function bootstrap() {
  const app = await NestFactory.create(ImageConverterModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
