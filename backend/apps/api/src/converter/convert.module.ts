import { DatabaseModule } from "@libs/database";
import { LoggerModule } from "@libs/logger";
import { Module } from "@nestjs/common";
import { S3Module } from "@libs/s3";
import { ConvertService } from "./convert.service";

@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        S3Module,
    ],
    providers: [
        ConvertService,
    ],
    exports: [
        ConvertService,
    ]
})


export class ConvertModule {

}