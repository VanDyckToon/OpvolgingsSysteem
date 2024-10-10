import { ApiProperty } from "@nestjs/swagger";

export class CreateMateriaalDto {
    @ApiProperty()
    beschrijving: string;
}
    