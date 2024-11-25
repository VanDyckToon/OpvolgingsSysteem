import { PartialType } from '@nestjs/swagger';
import { CreateGebruikerSubgroepDto } from './create-gebruiker-subgroep.dto';

export class UpdateGebruikerSubgroepDto extends PartialType(CreateGebruikerSubgroepDto) {}
