import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {

    log(message, config?) { }

    warn(message, config?) { }

    error(message, config?) { }

    debug(message, config?) { }
}
