import { PartialType } from '@nestjs/swagger';
import { CreateTechnischeCompetentieGebruikerDto } from './create-technische-competentie-gebruiker.dto';

export class UpdateTechnischeCompetentieGebruikerDto extends PartialType(CreateTechnischeCompetentieGebruikerDto) {}
