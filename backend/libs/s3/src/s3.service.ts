import { BucketItemFromList, BucketItemStat, Client, RemoveOptions } from 'minio';
import { InjectLogger } from '@libs/logger/logger.decorator';
import { LoggerService } from '@libs/logger';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid"
import Stream from 'stream';

@Injectable()
export class S3Service {

    private s3: Client;

    constructor(
        @InjectLogger(S3Service) private readonly logger: LoggerService,
    ) {
        const startTime = Date.now();
        try {
            this.s3 = new Client({
                endPoint: process.env.MINIO_ENDPOINT,
                port: +process.env.MINIO_PORT,
                useSSL: false,
                accessKey: process.env.MINIO_ACCESS_KEY,
                secretKey: process.env.MINIO_SECRET_KEY,
            });
        } catch (error) {
            this.logger.error(`Failed to initialize S3 connection.`, { error, startTime });
        }
    }

    public async getMeta(bucketName: string);
    public async getMeta(bucketName: string, fileName?: string): Promise<BucketItemStat> {
        try {
            if (fileName) {
                return await this.s3.statObject(bucketName, fileName);
            }

            const routeParts = bucketName.split(`/`);
            bucketName = routeParts[0];
            fileName = routeParts.slice(1).join(`/`);
            return await this.s3.statObject(bucketName, fileName);
        } catch (error) {
            this.logger.error(`Failed to get object metadata for ${fileName ? `${bucketName}/${fileName}` : bucketName}`);
            return null;
        }
    }

    public async bucketExists(bucketName: string): Promise<boolean> {
        try {
            return await this.s3.bucketExists(bucketName);
        } catch (error) {
            this.logger.error(`Failed to check if bucket exists.`, { error });
            return false;
        }
    }

    public async getBucketsList(): Promise<BucketItemFromList[]> {
        try {
            return await this.s3.listBuckets();
        } catch (error) {
            this.logger.error(`Failed to find buckets in minio.`, { error });
            return [];
        }
    }

    public async createBucket(name?: string): Promise<string> {
        try {
            const bucketNameLengthRestriction = 63;
            if (!name) {
                name = `${uuidv4}-${Date.now()}`;
            }
            name = name.trim().toLowerCase()
                .replaceAll(` `, `-`)
                .replaceAll(/[^a-z0-9\-]/g, ``)
                .slice(0, bucketNameLengthRestriction);

            await this.s3.makeBucket(name);
            return `${process.env.MINIO_ENDPOINT}/${name}`;
        } catch (error) {
            this.logger.error(`Failed to create new bucket in minio.`, { error });
            return null;
        }
    }

    public async bucketStartsWith(prefix: string): Promise<string> {
        try {
            const allBuckets = await this.s3.listBuckets();
            const bucket = allBuckets.find(bucket => bucket.name?.startsWith(prefix));
            return bucket.name || null;
        } catch (error) {
            this.logger.error(`Failed to check if there exists bucket with specified prefix ${prefix}`, { error });
            return null;
        }
    }

    public async bucketEndsWith(prefix: string): Promise<string> {
        try {
            const allBuckets = await this.s3.listBuckets();
            const bucket = allBuckets.find(bucket => bucket.name?.endsWith(prefix));
            return bucket.name || null;
        } catch (error) {
            this.logger.error(`Failed to check if there exists bucket with specified suffix ${prefix}`, { error });
            return null;
        }
    }

    public async putObject(bucketName: string, objectName: string, data: Buffer | Stream.Readable): Promise<string> {
        try {
            await this.s3.putObject(bucketName, objectName, data);
            return `${process.env.MINIO_ENDPOINT}/${bucketName}/${objectName}`;
        } catch (error) {
            this.logger.error(`Failed to put object: ${objectName}, in bucket: ${bucketName}.`, { error });
            return null;
        }
    }

    public async getObject(bucketName: string, objectName: string): Promise<Buffer> {
        try {
            return await new Promise(async (resolve, reject) => {
                const chunks: Buffer[] = [];
                const stream = await this.s3.getObject(bucketName, objectName);
                stream.on(`data`, chunk => chunks.push(chunk));
                stream.on(`end`, () => resolve(Buffer.concat(chunks)));
                stream.on(`error`, reject);
            });
        } catch (error) {
            this.logger.error(`Failed to get buffer of: ${objectName} from bucket: ${bucketName}`);
            return null;
        }
    }

    public async getObjectStream(bucketName: string, objectName: string): Promise<Stream.Readable> {
        try {
            return this.s3.getObject(bucketName, objectName);
        } catch (error) {
            this.logger.error(`Failed to get: ${objectName} of bucket: ${bucketName} stream.`, { error });
            return null;
        }
    }

    public async getPartOfObject(bucketName: string, objectName: string, lengthInBytes: number, offset: number = 0): Promise<Buffer> {
        return await new Promise(async (resolve, reject) => {
            try {
                const stream = await this.s3.getPartialObject(bucketName, objectName, offset, lengthInBytes);
                const chunks: Buffer[] = [];
                stream.on('data', chunk => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            } catch (error) {
                this.logger.error(`Failed to get partial of buffer of object: ${objectName} from bucket: ${bucketName}.`, { error });
                reject(error);
            }
        })
    }

    public async renameObject(targetBucketName: string, currentObjectName: string, newObjectName: string, remove: boolean = false): Promise<string> {
        try {
            await this.s3.copyObject(targetBucketName, newObjectName, `${targetBucketName}/${currentObjectName}`);
            if (remove) {
                await this.s3.removeObject(targetBucketName, currentObjectName);
            }
            return `${process}`
        } catch (error) {
            this.logger.error(`Failed to set new name: ${newObjectName}, of existing object: ${currentObjectName} in bucket: ${targetBucketName}.`, { error });
            return null;
        }
    }

    public async deleteObject(bucketName: string, objectName: string, options?: RemoveOptions): Promise<boolean> {
        try {
            if (options) {
                await this.s3.removeObject(bucketName, objectName, options);
            } else {
                await this.s3.removeObject(bucketName, objectName);
            }
            return true;
        } catch (error) {
            this.logger.error(`Failed to delete object: ${objectName}, from: ${bucketName}.`, { error });
            return false;
        }
    }

}
