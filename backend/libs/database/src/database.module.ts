import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as Entities from "./entities";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: `postgres`,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    entities: Object.values(Entities),
  }),
  TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  exports: [
    TypeOrmModule.forFeature(Object.values(Entities))
  ],
})

export class DatabaseModule { }
