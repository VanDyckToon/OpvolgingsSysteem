import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpleidingService } from './opleiding.service';
import { CreateOpleidingDto } from './dto/create-opleiding.dto';
import { UpdateOpleidingDto } from './dto/update-opleiding.dto';

@Controller('opleiding')
export class OpleidingController {
  constructor(private readonly opleidingService: OpleidingService) {}

  @Post()
  create(@Body() createOpleidingDto: CreateOpleidingDto) {
    return this.opleidingService.create(createOpleidingDto);
  }

  @Get()
  findAll() {
    return this.opleidingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opleidingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpleidingDto: UpdateOpleidingDto) {
    return this.opleidingService.update(+id, updateOpleidingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opleidingService.remove(+id);
  }
}
