import { LoggerModule } from "@libs/logger";
import { Module } from "@nestjs/common";
import { ConversionStatusResolver } from "./status.resolver";
import { ConversionStatusService } from "./status.service";

@Module({
    imports: [
        LoggerModule.forFeature([
            ConversionStatusResolver,
            ConversionStatusService,
        ])
    ],
    providers: [
        ConversionStatusResolver,
        ConversionStatusService,
    ],
    exports: [
        ConversionStatusResolver,
    ]
})
export class ConversionStatusModule {

}