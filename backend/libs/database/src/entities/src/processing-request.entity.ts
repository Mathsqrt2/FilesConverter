import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { ProcessingPackageEntity } from "./processing-package.entity";
import { DatabaseTablesEnum } from "@libs/enums/database-tables.enum";
import { ProcessingStatusEntity } from "./processing-status.entity";
import { ProcessingResultEntity } from "./processing-result.entity";
import { BasicProperties } from "../partials/basic-properties";

@Entity(DatabaseTablesEnum.PROCESSING_REQUESTS)
export class ProcessingRequestEntity extends BasicProperties {

    @Column({ type: `varchar`, length: 32 })
    public uuid: string;

    @Column({ type: `varchar`, length: 256, nullable: false })
    public bucketName: string;

    @Column({ type: `boolean` })
    public isFinished: boolean;

    @OneToMany(() => ProcessingStatusEntity, status => status.processingRequest, { onDelete: `CASCADE` })
    public processingStatuses?: ProcessingStatusEntity[];

    @OneToMany(() => ProcessingResultEntity, result => result.processingRequest, { onDelete: `CASCADE` })
    public processingResults?: ProcessingResultEntity[];

    @ManyToMany(() => ProcessingPackageEntity, processingPackage => processingPackage.processingRequests)
    @JoinTable({
        name: DatabaseTablesEnum.PACKAGES_ON_REQUESTS,
        joinColumn: {
            name: `requestId`,
            referencedColumnName: `id`
        },
        inverseJoinColumn: {
            name: `packageId`,
            referencedColumnName: `id`
        }
    })
    public processingPackages?: ProcessingPackageEntity[];

}