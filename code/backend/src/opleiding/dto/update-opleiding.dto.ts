import { PartialType } from '@nestjs/swagger';
import { CreateOpleidingDto } from './create-opleiding.dto';

export class UpdateOpleidingDto extends PartialType(CreateOpleidingDto) {}
