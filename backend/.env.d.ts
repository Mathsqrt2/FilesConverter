declare namespace NodeJS {
  export interface ProcessEnv {

    RABBITMQ_HOST: string;
    RABBITMQ_USER: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_PORT: number;
    RABBITMQ_ADMIN_PORT: string;
    RABBITMQ_URL: string;

  }
}
