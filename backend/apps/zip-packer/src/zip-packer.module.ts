import { Module } from '@nestjs/common';
import { ZipPackerController } from './zip-packer.controller';
import { ZipPackerService } from './zip-packer.service';

@Module({
  imports: [],
  controllers: [ZipPackerController],
  providers: [ZipPackerService],
})
export class ZipPackerModule {}
