import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaakMateriaalService } from './taak-materiaal.service';
import { CreateTaakMateriaalDto } from './dto/create-taak-materiaal.dto';
import { UpdateTaakMateriaalDto } from './dto/update-taak-materiaal.dto';

@Controller('taak-materiaal')
export class TaakMateriaalController {
  constructor(private readonly taakMateriaalService: TaakMateriaalService) {}

  @Post()
  create(@Body() createTaakMateriaalDto: CreateTaakMateriaalDto) {
    return this.taakMateriaalService.create(createTaakMateriaalDto);
  }

  @Get()
  findAll() {
    return this.taakMateriaalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taakMateriaalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaakMateriaalDto: UpdateTaakMateriaalDto) {
    return this.taakMateriaalService.update(+id, updateTaakMateriaalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taakMateriaalService.remove(+id);
  }
}
