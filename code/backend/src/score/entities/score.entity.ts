import { TechnischeCompetentieGebruiker } from '../../technische-competentie-gebruiker/entities/technische-competentie-gebruiker.entity';
import { CompetentieGebruiker } from '../../competentie-gebruiker/entities/competentie-gebruiker.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  scoreID: number;

  @Column()
  scoreNaam: string;

  @Column('float')
  waarde: number;

  @OneToMany(
    () => CompetentieGebruiker,
    (competentieGebruiker) => competentieGebruiker.score,
  )
  competentieGebruikers: CompetentieGebruiker[];

  @OneToMany(
    () => TechnischeCompetentieGebruiker,
    (technischeCompetentieGebruiker) => technischeCompetentieGebruiker.score,
  )
  technischeCompetentieGebruikers: TechnischeCompetentieGebruiker[];
}
