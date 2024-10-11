import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rolID: number;

  @Column()
  naam: string;

  @OneToMany(() => Gebruiker, (gebruiker) => gebruiker.rol)
  gebruikers: Gebruiker[];
}
