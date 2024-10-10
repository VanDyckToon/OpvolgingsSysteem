import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Materiaal {
    @PrimaryGeneratedColumn()
    materiaalID: number;

    @Column()
    beschrijving: string;
}
