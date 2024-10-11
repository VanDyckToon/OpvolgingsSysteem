import { Rol } from '../../rol/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { OpleidingGebruiker } from '../../opleiding-gebruiker/entities/opleiding-gebruiker.entity';

@Entity()
export class Gebruiker {
  @PrimaryGeneratedColumn()
  gebruikerID: number;

  @Column()
  @IsNotEmpty()
  voornaam: string;

  @Column()
  @IsNotEmpty()
  achternaam: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value)) // Transform "string" to null
  straat: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  huisNummer: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  postcode: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  woonplaats: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  rijksregisternummer: string;

  @Column({ nullable: true })
  datumInDienst: Date;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  verplaatsingWerk: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  nationaliteit: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  geboortePlaats: string;

  @Column({ nullable: true })
  geboorteDatum: Date;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  mutualiteit: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  uitbetalingsInstelling: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  rijbewijs: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  ICENaam: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  ICETelefoonnummer: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  GTB_VDAB: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  OCMW: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  BegeleidWonen: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  andere: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value === 'string' ? null : value))
  foto: string;

  @ManyToOne(() => Rol, (rol) => rol.gebruikers)
  @IsNotEmpty()
  rol: Rol;

  @OneToMany(() => OpleidingGebruiker, (opleidingGebruiker) => opleidingGebruiker.gebruiker)
    opleidingGebruikers: OpleidingGebruiker[];
}
