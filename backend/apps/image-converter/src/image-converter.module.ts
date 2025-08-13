import { Module } from '@nestjs/common';
import { ImageConverterController } from './image-converter.controller';
import { ImageConverterService } from './image-converter.service';

@Module({
  imports: [],
  controllers: [ImageConverterController],
  providers: [ImageConverterService],
})
export class ImageConverterModule {}
