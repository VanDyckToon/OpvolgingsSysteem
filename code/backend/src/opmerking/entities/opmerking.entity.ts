import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Opmerking {
  @PrimaryGeneratedColumn()
  opmerkingID: number;

  @Column()
  titel: string;

  @Column()
  beschrijving: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.werknemerOpmerkingen)
  @JoinColumn({ name: 'werknemerID' })
  werknemer: Gebruiker;

  @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.begeleiderOpmerkingen)
  @JoinColumn({ name: 'begeleiderID' })
  begeleider: Gebruiker;
}
