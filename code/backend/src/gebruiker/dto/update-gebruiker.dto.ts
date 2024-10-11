import { PartialType } from '@nestjs/swagger';
import { CreateGebruikerDto } from './create-gebruiker.dto';

export class UpdateGebruikerDto extends PartialType(CreateGebruikerDto) {}
