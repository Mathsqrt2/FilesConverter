import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { ProcessingRequestEntity } from "./processing-request.entity";
import { ProcessingPackageEntity } from "./processing-package.entity";
import { DatabaseTablesEnum, EncodingEnum } from "@libs/enums";

@Entity(DatabaseTablesEnum.PROCESSING_RESULTS)
export class ProcessingResultEntity {

    @Column({ type: `varchar`, length: 1024, nullable: false })
    public downloadUrl: string;

    @Column({ type: `timestamptz`, nullable: false })
    public finishedAt: Date;

    @Column({ type: `enum`, enum: EncodingEnum, nullable: false })
    public encodingType: EncodingEnum;

    @Column({ type: `timestamptz`, nullable: false })
    public expiresAt: Date;

    @Column({ type: `int`, nullable: false })
    public requestId: number;

    @ManyToOne(() => ProcessingRequestEntity, request => request.processingResults, { nullable: false })
    @JoinColumn({ name: `requestId` })
    public processingRequest: ProcessingRequestEntity;

    @ManyToMany(() => ProcessingPackageEntity, processingPackage => processingPackage.processingResults)
    @JoinTable({
        name: DatabaseTablesEnum.RESULTS_ON_PACKAGES,
        joinColumn: {
            name: `resultId`,
            referencedColumnName: `id`,
        },
        inverseJoinColumn: {
            name: `packageId`,
            referencedColumnName: `id`,
        }
    })
    public processingPackages: ProcessingPackageEntity[];
}