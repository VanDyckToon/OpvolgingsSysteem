import { PartialType } from '@nestjs/swagger';
import { CreateTaakMateriaalDto } from './create-taak-materiaal.dto';

export class UpdateTaakMateriaalDto extends PartialType(CreateTaakMateriaalDto) {}
