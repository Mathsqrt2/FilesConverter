import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioConverterService {
  getHello(): string {
    return 'Hello World!';
  }
}
