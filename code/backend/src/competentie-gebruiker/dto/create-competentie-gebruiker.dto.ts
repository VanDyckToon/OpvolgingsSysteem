import { ApiProperty } from "@nestjs/swagger";

export class CreateCompetentieGebruikerDto {
    @ApiProperty()
    datumBeoordeeld: Date;
}
