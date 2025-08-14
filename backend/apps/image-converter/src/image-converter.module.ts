import { ImageConverterController } from './image-converter.controller';
import { ImageConverterService } from './image-converter.service';
import { DatabaseModule } from '@libs/database';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@libs/logger';
import { Module } from '@nestjs/common';
import { S3Module } from '@libs/s3';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerModule,
    S3Module,
  ],
  controllers: [
    ImageConverterController
  ],
  providers: [
    ImageConverterService
  ],
})

export class ImageConverterModule { }
