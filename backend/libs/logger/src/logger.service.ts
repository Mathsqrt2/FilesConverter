import { LogEntity } from '@libs/database/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {

    private logger: Logger = new Logger()
    private settings = {
        shouldDisplayLog: true,
        shouldSaveLog: true,
    }

    constructor(
        @InjectRepository(LogEntity) private readonly logRepository: Repository<LogEntity>
    ) { }

    public setContext(context: string) {
        this.logger = new Logger(context);
    }

    private saveLog(): void {

    }

    public log(message: unknown, config?) {
        this.logger.log(message);
    }

    public warn(message: unknown, config?) {
        this.logger.warn(message);
    }

    public error(message: unknown, config?) {
        this.logger.error(message);
    }

    public debug(message: unknown, config?) {
        this.logger.debug(message);
    }
}
