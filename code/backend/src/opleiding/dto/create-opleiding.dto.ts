import { ApiProperty } from "@nestjs/swagger";

export class CreateOpleidingDto {
    @ApiProperty()
    naam: string;
    intern: boolean;
    datumStart: Date;
    datumEind: Date;
}
