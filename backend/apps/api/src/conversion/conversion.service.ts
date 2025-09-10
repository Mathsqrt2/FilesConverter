import { InjectLogger, LoggerService } from "@libs/logger";
import { ProcessingRequestEntity } from "@libs/database";
import { InjectRepository } from "@nestjs/typeorm";
import { EnqueueProcessing } from "@libs/types";
import { Injectable } from "@nestjs/common";
import { EncodingEnum } from "@libs/enums";
import { Repository } from "typeorm";
import { S3Service } from "@libs/s3";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesConversionService {

    constructor(
        @InjectRepository(ProcessingRequestEntity) private readonly requestRepository: Repository<ProcessingRequestEntity>,
        @InjectLogger(FilesConversionService) private readonly logger: LoggerService,
        private readonly minio: S3Service,
    ) { }

    public async enqueueProcessing<T extends EncodingEnum>({ files, method, config }: EnqueueProcessing<T>): Promise<any> {
        try {

            const [bucket] = await this.minio.createBucket(`${Date.now()}-${uuidv4()}`);
            const uploadedFiles = await Promise.allSettled(files.map(async (file) => {
                const { createReadStream, mimetype, filename } = await file;
                const stream = createReadStream();
                return this.minio.putObject(bucket, `${uuidv4()}-${filename}`, stream);
            }));

            

        } catch (error) {
            this.logger.error(`Failed to save client's files.`, { error });
        }


    }

    // This service will handle the conversion logic for different file types
    // Methods for converting audio, video, and image files will be added here

    private async convertAudio(file: any): Promise<string> {
        // Logic to convert audio files
        return "Audio file converted successfully!";
    }

    private async convertVideo(file: any): Promise<string> {
        // Logic to convert video files
        return "Video file converted successfully!";
    }

    private async convertImage(file: any): Promise<string> {
        // Logic to convert image files
        return "Image file converted successfully!";
    }

}