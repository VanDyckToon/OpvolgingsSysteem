import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubgroepService } from './subgroep.service';
import { CreateSubgroepDto } from './dto/create-subgroep.dto';
import { UpdateSubgroepDto } from './dto/update-subgroep.dto';

@Controller('subgroep')
export class SubgroepController {
  constructor(private readonly subgroepService: SubgroepService) {}

  @Post()
  create(@Body() createSubgroepDto: CreateSubgroepDto) {
    return this.subgroepService.create(createSubgroepDto);
  }

  @Get()
  findAll() {
    return this.subgroepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subgroepService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubgroepDto: UpdateSubgroepDto) {
    return this.subgroepService.update(+id, updateSubgroepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subgroepService.remove(+id);
  }
}
