import { Subgroep } from '../../subgroep/entities/subgroep.entity';
import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gebruiker_subgroep')
export class GebruikerSubgroep {
  @PrimaryGeneratedColumn()
  gebruikerSubgroepID: number;

  @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.gebruikersSubgroep)
  @JoinColumn({ name: 'gebruikerID' })
  gebruiker: Gebruiker;

  @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.begeleidersSubgroep)
  @JoinColumn({ name: 'begeleiderID' })
  begeleider: Gebruiker;

  @ManyToOne(() => Subgroep, (subgroep) => subgroep.gebruikerSubgroepen)
  @JoinColumn({ name: 'subgroepID' })
  subgroep: Subgroep;
}
