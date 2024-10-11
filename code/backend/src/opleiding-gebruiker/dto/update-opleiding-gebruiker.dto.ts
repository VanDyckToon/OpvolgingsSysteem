import { PartialType } from '@nestjs/swagger';
import { CreateOpleidingGebruikerDto } from './create-opleiding-gebruiker.dto';

export class UpdateOpleidingGebruikerDto extends PartialType(CreateOpleidingGebruikerDto) {}
