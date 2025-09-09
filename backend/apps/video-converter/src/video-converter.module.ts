import { VideoConverterController } from './video-converter.controller';
import { VideoConverterService } from './video-converter.service';
import { DatabaseModule } from '@libs/database';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@libs/logger';
import { Module } from '@nestjs/common';
import { S3Module } from '@libs/s3';

@Module({
  imports: [
    LoggerModule.forFeature([VideoConverterService]),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    S3Module,
  ],
  controllers: [
    VideoConverterController
  ],
  providers: [
    VideoConverterService
  ],
})

export class VideoConverterModule { }
