import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OpmerkingService } from './opmerking.service';
import { CreateOpmerkingDto } from './dto/create-opmerking.dto';
import { UpdateOpmerkingDto } from './dto/update-opmerking.dto';

@Controller('opmerking')
export class OpmerkingController {
  constructor(private readonly opmerkingService: OpmerkingService) {}

  @Post()
  create(@Body() createOpmerkingDto: CreateOpmerkingDto) {
    return this.opmerkingService.create(createOpmerkingDto);
  }

  @Get()
  findAll() {
    return this.opmerkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opmerkingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOpmerkingDto: UpdateOpmerkingDto,
  ) {
    return this.opmerkingService.update(+id, updateOpmerkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opmerkingService.remove(+id);
  }

  @Get('werknemer/:werknemerID')
  async findByWerknemer(@Param('werknemerID') werknemerID: number) {
    return this.opmerkingService.findByWerknemer(werknemerID);
  }
}
