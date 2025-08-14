import { Test, TestingModule } from '@nestjs/testing';
import { VideoConverterController } from './video-converter.controller';
import { VideoConverterService } from './video-converter.service';

describe('VideoConverterController', () => {
  let videoConverterController: VideoConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VideoConverterController],
      providers: [VideoConverterService],
    }).compile();

    videoConverterController = app.get<VideoConverterController>(VideoConverterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(videoConverterController.getHello()).toBe('Hello World!');
    });
  });
});
