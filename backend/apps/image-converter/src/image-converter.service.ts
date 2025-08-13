import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageConverterService {
  getHello(): string {
    return 'Hello World!';
  }
}
