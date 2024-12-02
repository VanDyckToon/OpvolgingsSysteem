import { PartialType } from '@nestjs/swagger';
import { CreateCompetentieGebruikerDto } from './create-competentie-gebruiker.dto';

export class UpdateCompetentieGebruikerDto extends PartialType(
  CreateCompetentieGebruikerDto,
) {}
