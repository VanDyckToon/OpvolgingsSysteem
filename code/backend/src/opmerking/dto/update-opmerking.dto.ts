import { PartialType } from '@nestjs/swagger';
import { CreateOpmerkingDto } from './create-opmerking.dto';

export class UpdateOpmerkingDto extends PartialType(CreateOpmerkingDto) {}
