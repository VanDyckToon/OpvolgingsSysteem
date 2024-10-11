import { ApiProperty } from "@nestjs/swagger";
import { Materiaal } from "src/materiaal/entities/materiaal.entity";
import { Taak } from "src/taak/entities/taak.entity";

export class CreateTaakMateriaalDto {
    @ApiProperty()
    taak: Taak;

    @ApiProperty()
    materiaal: Materiaal;
}
