import { Test, TestingModule } from '@nestjs/testing';
import { ZipPackerController } from './zip-packer.controller';
import { ZipPackerService } from './zip-packer.service';

describe('ZipPackerController', () => {
  let zipPackerController: ZipPackerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ZipPackerController],
      providers: [ZipPackerService],
    }).compile();

    zipPackerController = app.get<ZipPackerController>(ZipPackerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(zipPackerController.getHello()).toBe('Hello World!');
    });
  });
});
