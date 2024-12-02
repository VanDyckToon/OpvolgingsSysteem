import { ApiProperty } from '@nestjs/swagger';
import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';
import { Subgroep } from '../../subgroep/entities/subgroep.entity';

export class CreateGebruikerSubgroepDto {
  @ApiProperty()
  gebruiker: Gebruiker;

  @ApiProperty()
  subgroep: Subgroep;

  @ApiProperty()
  begeleider: Gebruiker;
}
