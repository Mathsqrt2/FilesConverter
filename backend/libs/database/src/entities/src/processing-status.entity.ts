import { ProcessingRequestEntity } from "./processing-request.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasicProperties } from "../partials/basic-properties";
import { DatabaseTablesEnum } from "@libs/enums";

@Entity(DatabaseTablesEnum.PROCESSING_STATUSES)
export class ProcessingStatusEntity extends BasicProperties {

    @Column({ type: `varchar`, nullable: false })
    public status: string;

    @Column({ type: `int`, nullable: false, default: 0 })
    public fullfilment: number;

    @Column({ type: `int`, nullable: false, })
    public requestId: number;

    @ManyToOne(() => ProcessingRequestEntity, request => request.processingStatuses)
    @JoinColumn({ name: `requestId` })
    public processingRequest: ProcessingRequestEntity

}