import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Taak } from "../../taak/entities/taak.entity";

@Entity()
export class TechnischeCompetentie {
    @PrimaryGeneratedColumn()
    technischeCompetentieID: number;

    @Column()
    naam: string;

    @Column()
    beschrijving: string;

    @ManyToOne(() => Taak, (taak) => taak.technischeCompetenties)
    @JoinColumn({ name: 'taakID' })
    taak: Taak;
}
