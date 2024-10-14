import { ApiProperty } from "@nestjs/swagger";

export class CreateTechnischeCompetentieGebruikerDto {
    @ApiProperty()
    datumBeoordeeld: Date;
}
