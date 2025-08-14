import { Test, TestingModule } from '@nestjs/testing';
import { AudioConverterController } from './audio-converter.controller';
import { AudioConverterService } from './audio-converter.service';

describe('AudioConverterController', () => {
  let audioConverterController: AudioConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AudioConverterController],
      providers: [AudioConverterService],
    }).compile();

    audioConverterController = app.get<AudioConverterController>(AudioConverterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(audioConverterController.getHello()).toBe('Hello World!');
    });
  });
});
