import { Rol } from '../../rol/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { OpleidingGebruiker } from '../../opleiding-gebruiker/entities/opleiding-gebruiker.entity';
import { Subgroep } from '../../subgroep/entities/subgroep.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';



@Entity()
export class Gebruiker {
  @PrimaryGeneratedColumn()
  gebruikerID: number;

  @Column()
  voornaam: string;

  @Column()
  achternaam: string;

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

  @ManyToOne(() => Rol, (rol) => rol.gebruikers)
  rol: Rol;


  @OneToMany(() => OpleidingGebruiker, (opleidingGebruiker) => opleidingGebruiker.gebruiker)
    opleidingGebruikers: OpleidingGebruiker[];

  @ManyToOne(() => Subgroep, (subgroep) => subgroep.gebruikers)
  @JoinColumn({ name: 'subgroepID' })
  subgroep: Subgroep;

}
