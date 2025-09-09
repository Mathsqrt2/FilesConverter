import { LogEntity } from '@libs/database/entities';
import { LoggerConfig, LoggerErrorConfig } from '@libs/types/logger.types';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {

    private context: string;
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
        this.context = context;
    }

    private async saveLog(message: unknown, config?: LoggerErrorConfig): Promise<void> {
        try {
            let log: LogEntity = this.logRepository.create({
                state: message,
                label: config?.label || null,
                tag: config?.tag || null,
                error: config?.error || null,
                context: config?.context || this.context || null,
                duration: config?.startTime
                    ? Date.now() - config.startTime
                    : null,
            });

            if (typeof message === `object`) {
                log.state = JSON.parse(JSON.stringify(message))
            } else {
                log.message = message.toString();
            }

            await this.logRepository.save(log);

        } catch (error) {
            this.error(`Failed to save log in database.`, { error, save: false });
        }
    }

    public log(message: unknown, config?: LoggerConfig) {

        if (config.save || (config[`save`] === undefined && this.settings.shouldSaveLog)) {
            this.saveLog(message, config);
        }

        this.logger.log(message);
    }

    public warn(message: unknown, config?: LoggerConfig) {

        if (config.save || (config[`save`] === undefined && this.settings.shouldSaveLog)) {
            this.saveLog(message, config);
        }

        this.logger.warn(message);
    }

    public error(message: unknown, config?: LoggerErrorConfig) {

        if (config.save || (config[`save`] === undefined && this.settings.shouldSaveLog)) {
            this.saveLog(message, config);
        }

        this.logger.error(message);
    }

    public debug(message: unknown, config?: LoggerConfig) {

        if (config.save || (config[`save`] === undefined && this.settings.shouldSaveLog)) {
            this.saveLog(message, config);
        }

        this.logger.debug(message);
    }
}
