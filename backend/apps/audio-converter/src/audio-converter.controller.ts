import { Controller, Get } from '@nestjs/common';
import { AudioConverterService } from './audio-converter.service';

@Controller()
export class AudioConverterController {
  constructor(private readonly audioConverterService: AudioConverterService) {}

  @Get()
  getHello(): string {
    return this.audioConverterService.getHello();
  }
}
