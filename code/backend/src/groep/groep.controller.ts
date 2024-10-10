import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroepService } from './groep.service';
import { CreateGroepDto } from './dto/create-groep.dto';
import { UpdateGroepDto } from './dto/update-groep.dto';

@Controller('groep')
export class GroepController {
  constructor(private readonly groepService: GroepService) {}

  @Post()
  create(@Body() createGroepDto: CreateGroepDto) {
    return this.groepService.create(createGroepDto);
  }

  @Get()
  findAll() {
    return this.groepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groepService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroepDto: UpdateGroepDto) {
    return this.groepService.update(+id, updateGroepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groepService.remove(+id);
  }
}
