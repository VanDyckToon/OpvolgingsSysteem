import { ApiProperty } from '@nestjs/swagger';
import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';

export class CreateOpmerkingDto {
  @ApiProperty()
  titel: string;

  @ApiProperty()
  beschrijving: string;

  @ApiProperty()
  werknemer: Gebruiker;

  @ApiProperty()
  begeleider: Gebruiker;
}
