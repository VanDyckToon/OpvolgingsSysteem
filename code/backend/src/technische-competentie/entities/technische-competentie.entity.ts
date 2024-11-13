import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Taak } from '../../taak/entities/taak.entity';
import { TechnischeCompetentieGebruiker } from '../../technische-competentie-gebruiker/entities/technische-competentie-gebruiker.entity';

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

  @OneToMany(
    () => TechnischeCompetentieGebruiker,
    (technischeCompetentieGebruiker) =>
      technischeCompetentieGebruiker.technischeCompetentie,
  )
  technischeCompetentieGebruikers: TechnischeCompetentieGebruiker[];
}
