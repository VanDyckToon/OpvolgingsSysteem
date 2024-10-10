import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Groep {
    @PrimaryGeneratedColumn()
    groepID: number;

    @Column()
    naam: string;
}
