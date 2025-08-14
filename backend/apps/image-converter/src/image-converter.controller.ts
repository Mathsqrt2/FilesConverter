import { Controller, Get } from '@nestjs/common';
import { ImageConverterService } from './image-converter.service';

@Controller()
export class ImageConverterController {
  constructor(private readonly imageConverterService: ImageConverterService) {}

  @Get()
  getHello(): string {
    return this.imageConverterService.getHello();
  }
}
