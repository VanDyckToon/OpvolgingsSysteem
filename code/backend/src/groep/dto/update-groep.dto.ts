import { PartialType } from '@nestjs/swagger';
import { CreateGroepDto } from './create-groep.dto';

export class UpdateGroepDto extends PartialType(CreateGroepDto) {}
