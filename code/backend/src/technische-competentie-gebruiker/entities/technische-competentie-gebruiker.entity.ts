import { Gebruiker } from "../../gebruiker/entities/gebruiker.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Score } from "../../score/entities/score.entity";
import { TechnischeCompetentie } from "../../technische-competentie/entities/technische-competentie.entity";

@Entity()
export class TechnischeCompetentieGebruiker {
    @PrimaryGeneratedColumn()
    technischeCompetentieGebruikerID: number;

    @Column()
    datumBeoordeeld: Date;

    @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.technischeCompetentieGebruikers)
    @JoinColumn({ name: 'gebruikerID' })
    gebruiker: Gebruiker;

    @ManyToOne(() => Score, (score) => score.technischeCompetentieGebruikers)
    @JoinColumn({ name: 'scoreID' })
    score: Score;

    @ManyToOne(() => TechnischeCompetentie, (technischeCompetentie) => technischeCompetentie.technischeCompetentieGebruikers)
    @JoinColumn({ name: 'technischeCompetentieID' })
    technischeCompetentie: TechnischeCompetentie;
}
