import { Rol } from '../../rol/entities/rol.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OpleidingGebruiker } from '../../opleiding-gebruiker/entities/opleiding-gebruiker.entity';
import { Subgroep } from '../../subgroep/entities/subgroep.entity';
import { CompetentieGebruiker } from '../../competentie-gebruiker/entities/competentie-gebruiker.entity';
import { TechnischeCompetentieGebruiker } from '../../technische-competentie-gebruiker/entities/technische-competentie-gebruiker.entity';
import { Opmerking } from '../../opmerking/entities/opmerking.entity';
import { GebruikerSubgroep } from '../../gebruiker-subgroep/entities/gebruiker-subgroep.entity';

@Entity()
export class Gebruiker {
  @PrimaryGeneratedColumn()
  gebruikerID: number;

  @Column()
  voornaam: string;

  @Column()
  achternaam: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  telefoonnummer: string;

  @Column({ nullable: true })
  wachtwoord: string;

  @Column({ nullable: true })
  straat: string;

  @Column({ nullable: true })
  huisNummer: string;

  @Column({ nullable: true })
  postcode: string;

  @Column({ nullable: true })
  woonplaats: string;

  @Column({ nullable: true })
  ICENaam: string;

  @Column({ nullable: true })
  ICETelefoonnummer: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ nullable: true })
  extraOpmerking: string;

  @ManyToOne(() => Rol, (rol) => rol.gebruikers)
  rol: Rol;

  @OneToMany(
    () => OpleidingGebruiker,
    (opleidingGebruiker) => opleidingGebruiker.gebruiker,
  )
  opleidingGebruikers: OpleidingGebruiker[];

  @ManyToOne(() => Subgroep, (subgroep) => subgroep.gebruikers, {
    nullable: true,
  })
  subgroep: Subgroep;

  @ManyToMany(() => Gebruiker, (gebruiker) => gebruiker.begeleid)
  @JoinTable({
    name: 'gebruikers_begeleiders',
    joinColumn: { name: 'gebruikerID', referencedColumnName: 'gebruikerID' },
    inverseJoinColumn: {
      name: 'begeleiderID',
      referencedColumnName: 'gebruikerID',
    },
  })
  begeleiders: Gebruiker[];

  @ManyToMany(() => Gebruiker, (begeleider) => begeleider.begeleiders)
  begeleid: Gebruiker[];

  @OneToMany(
    () => CompetentieGebruiker,
    (competentieGebruiker) => competentieGebruiker.gebruiker,
  )
  competentieGebruikers: CompetentieGebruiker[];

  @OneToMany(
    () => TechnischeCompetentieGebruiker,
    (technischeCompetentieGebruiker) =>
      technischeCompetentieGebruiker.gebruiker,
  )
  technischeCompetentieGebruikers: TechnischeCompetentieGebruiker[];

  @OneToMany(() => Opmerking, (opmerking) => opmerking.werknemer)
  werknemerOpmerkingen: Opmerking[];

  @OneToMany(() => Opmerking, (opmerking) => opmerking.begeleider)
  begeleiderOpmerkingen: Opmerking[];

  @OneToMany(
    () => GebruikerSubgroep,
    (gebruikerSubgroep) => gebruikerSubgroep.gebruiker,
  )
  gebruikersSubgroep: GebruikerSubgroep[];

  @Column({ default: null })
  subgroepID: string;
}
