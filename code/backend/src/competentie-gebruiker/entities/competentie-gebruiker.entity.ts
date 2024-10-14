import { Competentie } from "../../competentie/entities/competentie.entity";
import { Gebruiker } from "../../gebruiker/entities/gebruiker.entity";
import { Score } from "../../score/entities/score.entity";
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CompetentieGebruiker {
    @PrimaryGeneratedColumn()
    competentieGebruikerID: number;

    @Column()
    datumBeoordeeld: Date;

    @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.competentieGebruikers)
    @JoinColumn({ name: 'gebruikerID' })
    gebruiker: Gebruiker;

    @ManyToOne(() => Score, (score) => score.competentieGebruikers)
    @JoinColumn({ name: 'scoreID' })
    score: Score;

    @ManyToOne(() => Competentie, (competentie) => competentie.competentieGebruikers)
    @JoinColumn({ name: 'competentieID' })
    competentie: Competentie;
}
