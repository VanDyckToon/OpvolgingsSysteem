import { ApiProperty } from "@nestjs/swagger";
import { Groep } from "../../groep/entities/groep.entity";

export class CreateSubgroepDto {
    @ApiProperty()
    subgroepNaam: string;

    @ApiProperty()
    groep: Groep;
}
