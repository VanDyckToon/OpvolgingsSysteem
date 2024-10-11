import { PartialType } from '@nestjs/swagger';
import { CreateGebruikerDto } from './create-gebruikers.dto';

export class UpdateGebruikerDto extends PartialType(CreateGebruikerDto) {}
