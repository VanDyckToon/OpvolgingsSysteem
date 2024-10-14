import { ApiProperty } from '@nestjs/swagger';
import { Materiaal } from '../../materiaal/entities/materiaal.entity';
import { Taak } from '../../taak/entities/taak.entity';

export class CreateTaakMateriaalDto {
  @ApiProperty()
  taak: Taak;

  @ApiProperty()
  materiaal: Materiaal;
}
