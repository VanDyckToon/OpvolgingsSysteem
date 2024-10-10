import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Opleiding {
    @PrimaryGeneratedColumn()
    opleidingID: number;

    @Column()
    naam: string;

    @Column()
    intern: boolean;

    @Column()
    datumStart: Date;

    @Column()
    datumEind: Date;
}