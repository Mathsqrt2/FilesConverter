import { Test, TestingModule } from '@nestjs/testing';
import { ImageConverterController } from './image-converter.controller';
import { ImageConverterService } from './image-converter.service';

describe('ImageConverterController', () => {
  let imageConverterController: ImageConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ImageConverterController],
      providers: [ImageConverterService],
    }).compile();

    imageConverterController = app.get<ImageConverterController>(ImageConverterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(imageConverterController.getHello()).toBe('Hello World!');
    });
  });
});
