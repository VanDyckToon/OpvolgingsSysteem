import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Taak } from '../../taak/entities/taak.entity';
import { Subgroep } from '../../subgroep/entities/subgroep.entity';

@Entity()
export class Groep {
  @PrimaryGeneratedColumn()
  groepID: number;

  @Column()
  naam: string;

  @OneToMany(() => Taak, (taak) => taak.groep)
  taken: Taak[];

  @OneToMany(() => Subgroep, (subgroep) => subgroep.groep)
  subgroepen: Subgroep[];
}
