import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { FileUpload } from "graphql-upload/GraphQLUpload.mjs";
import { InjectLogger } from "@libs/logger/logger.decorator";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoggerService } from "@libs/logger";
import { S3Service } from "@libs/s3";
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class FilesConversionResolver {

    constructor(
        @InjectLogger(FilesConversionResolver) private readonly logger: LoggerService,
        private readonly minio: S3Service,
    ) { }

    @Mutation(() => Boolean)
    public async uploadFile(
        @Args({ name: `file`, type: () => GraphQLUpload }) file: FileUpload,
    ): Promise<boolean> {
        try {
            const { createReadStream, mimetype, filename } = file;
            const stream = createReadStream();
            const [bucket] = await this.minio.createBucket(`${Date.now()}-${uuidv4()}`);
            await this.minio.putObject(bucket, `${uuidv4()}-${filename}`, stream);
            return true;

        } catch (error) {
            this.logger.error(`Failed to save client's files.`, { error });
            return false;
        }
    }


}