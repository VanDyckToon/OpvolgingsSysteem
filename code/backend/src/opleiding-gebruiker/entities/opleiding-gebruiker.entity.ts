import { Gebruiker } from "../../gebruiker/entities/gebruiker.entity";
import { Opleiding } from "../../opleiding/entities/opleiding.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class OpleidingGebruiker {
    @PrimaryGeneratedColumn()
    opleidingGebruikerID: number;

    @ManyToOne(() => Opleiding, (opleiding) => opleiding.opleidingGebruikers)
    @JoinColumn({ name: 'opleidingID' })
    opleiding: Opleiding;

    @ManyToOne(() => Gebruiker, (gebruiker) => gebruiker.opleidingGebruikers)
    @JoinColumn({ name: 'gebruikerID' })
    gebruiker: Gebruiker;
}
