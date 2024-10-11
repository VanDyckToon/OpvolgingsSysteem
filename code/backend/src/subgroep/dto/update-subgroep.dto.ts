import { PartialType } from '@nestjs/swagger';
import { CreateSubgroepDto } from './create-subgroep.dto';

export class UpdateSubgroepDto extends PartialType(CreateSubgroepDto) {}
