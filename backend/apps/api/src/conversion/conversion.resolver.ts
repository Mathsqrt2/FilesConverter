import { FilesConversionService } from "./conversion.service";
import { FileUpload } from "graphql-upload/GraphQLUpload.mjs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { InjectLogger } from "@libs/logger/logger.decorator";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UploadFilesResponse } from " @libs/models";
import { LoggerService } from "@libs/logger";
import { EncodingEnum } from "@libs/enums";
import { S3Service } from "@libs/s3";

@Resolver()
export class FilesConversionResolver {

    constructor(
        @InjectLogger(FilesConversionResolver) private readonly logger: LoggerService,
        private readonly conversion: FilesConversionService,
        private readonly minio: S3Service,
    ) { }

    @Mutation(() => UploadFilesResponse)
    public async uploadFiles(
        @Args(`files`, { type: () => [GraphQLUpload], nullable: false }) files: Promise<FileUpload>[],
        @Args(`method`, { type: () => EncodingEnum, nullable: false }) method: EncodingEnum,
    ): Promise<UploadFilesResponse> {
        try {

            const [
                requestId,
                rejectedFiles,
                acceptedFilesIds
            ]: [string, string[], string[]] = await this.conversion.enqueueProcessing({ files, method })
            return { requestId, rejectedFiles, acceptedFilesIds };

        } catch (error) {
            this.logger.error(`Failed to enqueue files.`, { error });
            return {
                requestId: null,
                rejectedFiles: await Promise.all(files.map(async (file) => (await file).filename)),
                acceptedFilesIds: []
            };
        }
    }

}

