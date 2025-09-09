declare namespace NodeJS {
  export interface ProcessEnv {

    RABBITMQ_HOST: string;
    RABBITMQ_USER: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_PORT: number;
    RABBITMQ_ADMIN_PORT: string;
    RABBITMQ_URL: string;

    MINIO_ENDPOINT: string;
    MINIO_PORT: number;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;

    DB_TYPE: "postgres";
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
  }
}
