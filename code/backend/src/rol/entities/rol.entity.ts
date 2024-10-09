import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rolID: number;

  @Column()
  naam: string;
}
