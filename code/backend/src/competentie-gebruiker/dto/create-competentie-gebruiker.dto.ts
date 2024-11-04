import { ApiProperty } from '@nestjs/swagger';
import { Gebruiker } from '../../gebruiker/entities/gebruiker.entity';
import { Score } from '../../score/entities/score.entity';

export class CreateCompetentieGebruikerDto {
  @ApiProperty()
  datumBeoordeeld: Date;
  @ApiProperty()
  gebruiker: Gebruiker;
  @ApiProperty()
  score: Score;
}
