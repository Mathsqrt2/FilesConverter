import { Column, Entity } from "typeorm";
import { BasicProperties } from "../partials/basic-properties";

@Entity(`logs`)
export class LogEntity extends BasicProperties {

    @Column({ type: `text`, nullable: true })
    public message?: string;

    @Column({ type: `varchar`, length: 256, nullable: true })
    public label?: string;

    @Column({ type: `varchar`, length: 32, nullable: true })
    public tag?: string;

    @Column({ type: `json`, nullable: true })
    public error?: JSON;

    @Column({ type: `json`, nullable: true })
    public state?: JSON;

}