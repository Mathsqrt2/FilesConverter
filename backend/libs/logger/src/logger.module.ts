import { DynamicModule, Module, Type } from '@nestjs/common';
import { DatabaseModule, LogEntity } from '@libs/database';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from './logger.decorator';
import { LoggerService } from './logger.service';
import { Repository } from 'typeorm';

@Module({
  imports: [
    DatabaseModule
  ]
})

export class LoggerModule {

  static forFeature(targets: Type<any>[]): DynamicModule {
    const providers = targets.map((target) => ({
      provide: getLoggerToken(target),
      useFactory: (repository: Repository<LogEntity>) => {
        const logger = new LoggerService(repository);
        logger.setContext(target.name);
        return logger;
      },
      inject: [
        getRepositoryToken(LogEntity)
      ]
    }))

    return {
      module: LoggerModule,
      providers,
      exports: providers,
    }
  }
}
