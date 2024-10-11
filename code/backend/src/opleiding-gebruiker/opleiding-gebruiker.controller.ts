import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';
import { CreateOpleidingGebruikerDto } from './dto/create-opleiding-gebruiker.dto';
import { UpdateOpleidingGebruikerDto } from './dto/update-opleiding-gebruiker.dto';

@Controller('opleiding-gebruiker')
export class OpleidingGebruikerController {
  constructor(private readonly opleidingGebruikerService: OpleidingGebruikerService) {}

  @Post()
  create(@Body() createOpleidingGebruikerDto: CreateOpleidingGebruikerDto) {
    return this.opleidingGebruikerService.create(createOpleidingGebruikerDto);
  }

  @Get()
  findAll() {
    return this.opleidingGebruikerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opleidingGebruikerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpleidingGebruikerDto: UpdateOpleidingGebruikerDto) {
    return this.opleidingGebruikerService.update(+id, updateOpleidingGebruikerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opleidingGebruikerService.remove(+id);
  }
}
