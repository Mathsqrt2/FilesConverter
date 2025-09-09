import { DatabaseTablesEnum } from "@libs/enums/database-tables.enum";
import { BasicProperties } from "../partials/basic-properties";
import { Column, Entity } from "typeorm";

@Entity(DatabaseTablesEnum.LOGS)
export class LogEntity extends BasicProperties {

    @Column({ type: `text`, nullable: true, default: null })
    public message?: string;

    @Column({ type: `varchar`, length: 256, nullable: true, default: null })
    public label?: string;

    @Column({ type: `varchar`, length: 32, nullable: true, default: null })
    public tag?: string;

    @Column({ type: `json`, nullable: true, default: null })
    public error?: JSON;

    @Column({ type: `json`, nullable: true, default: null })
    public state?: JSON;

    @Column({ type: `varchar`, nullable: true, default: null })
    public context: string;

    @Column({ type: `int`, nullable: true, default: null })
    public duration: number;

}