import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Groep } from '../../groep/entities/groep.entity';
import { TechnischeCompetentie } from '../../technische-competentie/entities/technische-competentie.entity';
import { TaakMateriaal } from '../../taak-materiaal/entities/taak-materiaal.entity';

@Entity()
export class Taak {
  @PrimaryGeneratedColumn()
  taakID: number;

  @Column()
  naam: string;

  @ManyToOne(() => Groep, (groep) => groep.taken)
  @JoinColumn({ name: 'groepID' })
  groep: Groep;

  @OneToMany(
    () => TechnischeCompetentie,
    (technischeCompetentie) => technischeCompetentie.taak,
  )
  technischeCompetenties: TechnischeCompetentie[];

  @OneToMany(() => TaakMateriaal, (taakMateriaal) => taakMateriaal.taak)
  taakMaterialen: TaakMateriaal[];
}
