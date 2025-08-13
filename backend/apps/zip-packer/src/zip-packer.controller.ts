import { Controller, Get } from '@nestjs/common';
import { ZipPackerService } from './zip-packer.service';

@Controller()
export class ZipPackerController {
  constructor(private readonly zipPackerService: ZipPackerService) {}

  @Get()
  getHello(): string {
    return this.zipPackerService.getHello();
  }
}
