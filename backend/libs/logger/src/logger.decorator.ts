import { Inject, Type } from "@nestjs/common";

export const getLoggerToken = (target: Type<{ name: string }>) => `LOGGER_${target.name}`;
export const InjectLogger = (target: Type<any>) => Inject(getLoggerToken(target));

