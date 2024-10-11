import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TaakMateriaal } from "../../taak-materiaal/entities/taak-materiaal.entity";

@Entity()
export class Materiaal {
    @PrimaryGeneratedColumn()
    materiaalID: number;

    @Column()
    beschrijving: string;

    @OneToMany(
        () => TaakMateriaal, 
        (taakMateriaal) => taakMateriaal.materiaal,
    )
    taakMaterialen: TaakMateriaal[];
}
