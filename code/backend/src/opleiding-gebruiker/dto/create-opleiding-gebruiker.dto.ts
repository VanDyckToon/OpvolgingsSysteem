import { ApiProperty } from "@nestjs/swagger";
import { Gebruiker } from "../../gebruiker/entities/gebruiker.entity";
import { Opleiding } from "../../opleiding/entities/opleiding.entity";

export class CreateOpleidingGebruikerDto {
    @ApiProperty()
    opleiding: Opleiding;

    @ApiProperty()
    gebruiker: Gebruiker;
}
