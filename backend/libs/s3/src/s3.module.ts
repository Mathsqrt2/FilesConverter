import { LoggerModule } from '@libs/logger';
import { S3Service } from './s3.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    LoggerModule,
  ],
  providers: [
    S3Service
  ],
  exports: [
    S3Service
  ],
})

export class S3Module { }
