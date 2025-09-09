export type LoggerConfig = {
    save?: boolean,
    display?: boolean,
    label?: string,
    tag?: string,
    startTime?: number,
    context?: string,
}

export type LoggerErrorConfig = LoggerConfig & {
    error?: unknown,
}