import { DynamicModule, Module, Type } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { DatabaseModule } from '@libs/database';
import { getLoggerToken } from './logger.decorator';
import { Repository } from 'typeorm';
import { LogEntity } from '@libs/database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

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
