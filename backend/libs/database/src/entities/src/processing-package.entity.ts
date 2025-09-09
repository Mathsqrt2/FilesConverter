import { Column, Entity, ManyToMany } from "typeorm";
import { DatabaseTablesEnum } from "@libs/enums/database-tables.enum";
import { ProcessingResultEntity } from "./processing-result.entity";
import { ProcessingRequestEntity } from "./processing-request.entity";

@Entity(DatabaseTablesEnum.PROCESSING_PACKAGES)
export class ProcessingPackageEntity {

    @Column({ type: `int`, nullable: false })
    public packageSize: number;

    @Column({ type: `int`, nullable: false })
    public totalFilesInside: number;

    @ManyToMany(() => ProcessingRequestEntity, processingRequest => processingRequest.processingPackages)
    public processingRequests: ProcessingRequestEntity[];

    @ManyToMany(() => ProcessingResultEntity, processingResult => processingResult.processingPackages)
    public processingResults: ProcessingResultEntity[];

}