import { ProcessingRequestEntity } from "./processing-request.entity";
import { ProcessingResultEntity } from "./processing-result.entity";
import { BasicProperties } from "../partials/basic-properties";
import { Column, Entity, ManyToMany } from "typeorm";
import { DatabaseTablesEnum } from "@libs/enums";

@Entity(DatabaseTablesEnum.PROCESSING_PACKAGES)
export class ProcessingPackageEntity extends BasicProperties {

    @Column({ type: `int`, nullable: false })
    public packageSize: number;

    @Column({ type: `int`, nullable: false })
    public totalFilesInside: number;

    @ManyToMany(() => ProcessingRequestEntity, processingRequest => processingRequest.processingPackages)
    public processingRequests: ProcessingRequestEntity[];

    @ManyToMany(() => ProcessingResultEntity, processingResult => processingResult.processingPackages)
    public processingResults: ProcessingResultEntity[];

}