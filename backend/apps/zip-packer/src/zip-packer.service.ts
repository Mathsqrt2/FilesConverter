import { Injectable } from '@nestjs/common';

@Injectable()
export class ZipPackerService {
  getHello(): string {
    return 'Hello World!';
  }
}
