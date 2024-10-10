import { ApiProperty } from "@nestjs/swagger";

export class CreateGroepDto {
    @ApiProperty()
    naam:string;
}
