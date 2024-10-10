import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaalService } from './materiaal.service';
import { CreateMateriaalDto } from './dto/create-materiaal.dto';
import { UpdateMateriaalDto } from './dto/update-materiaal.dto';

@Controller('materiaal')
export class MateriaalController {
  constructor(private readonly materiaalService: MateriaalService) {}

  @Post()
  create(@Body() createMateriaalDto: CreateMateriaalDto) {
    return this.materiaalService.create(createMateriaalDto);
  }

  @Get()
  findAll() {
    return this.materiaalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiaalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaalDto: UpdateMateriaalDto) {
    return this.materiaalService.update(+id, updateMateriaalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiaalService.remove(+id);
  }
}
