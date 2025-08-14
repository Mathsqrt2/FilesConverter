import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoConverterService {
  getHello(): string {
    return 'Hello World!';
  }
}
