import { ApiProperty } from "@nestjs/swagger";
import { Taak } from "../../taak/entities/taak.entity";

export class CreateTechnischeCompetentieDto {
    @ApiProperty()
    naam: string;

    @ApiProperty()
    beschrijving: string;

    @ApiProperty()
    taak: Taak;
}
