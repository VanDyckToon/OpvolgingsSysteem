import { PartialType } from '@nestjs/swagger';
import { CreateTechnischeCompetentieDto } from './create-technische-competentie.dto';

export class UpdateTechnischeCompetentieDto extends PartialType(CreateTechnischeCompetentieDto) {}
