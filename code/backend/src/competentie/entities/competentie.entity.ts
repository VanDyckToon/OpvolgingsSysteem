import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Competentie {
  @PrimaryGeneratedColumn()
  competentieID: number;

  @Column()
  naam: string;

  @Column()
  beschrijving: string;
}
