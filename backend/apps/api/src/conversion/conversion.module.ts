import { FilesConversionResolver } from "./conversion.resolver";
import { FilesConversionService } from "./conversion.service";
import { DatabaseModule } from "@libs/database";
import { LoggerModule } from "@libs/logger";
import { Module } from "@nestjs/common";
import { S3Module } from "@libs/s3";

@Module({
    imports: [
        LoggerModule.forFeature([FilesConversionResolver, FilesConversionService]),
        DatabaseModule,
        S3Module,
    ],
    providers: [
        FilesConversionResolver,
        FilesConversionService,
    ],
    exports: [
        FilesConversionResolver,
    ]
})


export class FilesConversionModule {

}