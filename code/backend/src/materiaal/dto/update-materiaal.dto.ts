import { PartialType } from '@nestjs/swagger';
import { CreateMateriaalDto } from './create-materiaal.dto';

export class UpdateMateriaalDto extends PartialType(CreateMateriaalDto) {}
