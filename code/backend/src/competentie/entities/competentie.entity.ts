import { CompetentieGebruiker } from '../../competentie-gebruiker/entities/competentie-gebruiker.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Competentie {
  @PrimaryGeneratedColumn()
  competentieID: number;

  @Column()
  naam: string;

  @Column()
  beschrijving: string;

  @OneToMany(() => CompetentieGebruiker, (competentieGebruiker) => competentieGebruiker.competentie)
  competentieGebruikers: CompetentieGebruiker[];
}
