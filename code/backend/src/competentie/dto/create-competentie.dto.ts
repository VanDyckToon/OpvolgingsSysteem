import { ApiProperty } from '@nestjs/swagger';

export class CreateCompetentieDto {
  @ApiProperty()
  naam: string;

  @ApiProperty()
  beschrijving: string;
}
