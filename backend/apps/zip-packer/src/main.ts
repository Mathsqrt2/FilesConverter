import { NestFactory } from '@nestjs/core';
import { ZipPackerModule } from './zip-packer.module';

async function bootstrap() {
  const app = await NestFactory.create(ZipPackerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
