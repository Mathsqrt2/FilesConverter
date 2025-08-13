import { Controller, Get } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public removeOldFiles(): void {

  }

  @Get()
  getHello(): string {
    return this.schedulerService.getHello();
  }
}
