import { Controller, Get } from '@nestjs/common';
import { VideoConverterService } from './video-converter.service';

@Controller()
export class VideoConverterController {
  constructor(private readonly videoConverterService: VideoConverterService) {}

  @Get()
  getHello(): string {
    return this.videoConverterService.getHello();
  }
}
