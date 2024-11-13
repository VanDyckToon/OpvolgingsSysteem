import { OpleidingGebruiker } from '../../opleiding-gebruiker/entities/opleiding-gebruiker.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(
    () => OpleidingGebruiker,
    (opleidingGebruiker) => opleidingGebruiker.opleiding,
  )
  opleidingGebruikers: OpleidingGebruiker[];
}
