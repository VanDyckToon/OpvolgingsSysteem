import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Taak } from "../../taak/entities/taak.entity";
import { Materiaal } from "../../materiaal/entities/materiaal.entity";

@Entity()
export class TaakMateriaal {
    @PrimaryGeneratedColumn()
    taakMateriaalID: number;

    @ManyToOne(() => Taak, (taak) => taak.taakMaterialen)
    @JoinColumn({ name: 'taakID' })
    taak: Taak;

    @ManyToOne(() => Materiaal, (materiaal) => materiaal.taakMaterialen)
    @JoinColumn({ name: 'materiaalID' })
    materiaal: Materiaal;
}
