import { PartialType } from '@nestjs/swagger';
import { CreateCompetentieDto } from './create-competentie.dto';

export class UpdateCompetentieDto extends PartialType(CreateCompetentieDto) {}
