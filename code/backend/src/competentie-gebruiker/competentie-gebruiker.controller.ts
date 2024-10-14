import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetentieGebruikerService } from './competentie-gebruiker.service';
import { CreateCompetentieGebruikerDto } from './dto/create-competentie-gebruiker.dto';
import { UpdateCompetentieGebruikerDto } from './dto/update-competentie-gebruiker.dto';

@Controller('competentie-gebruiker')
export class CompetentieGebruikerController {
  constructor(private readonly competentieGebruikerService: CompetentieGebruikerService) {}

  @Post()
  create(@Body() createCompetentieGebruikerDto: CreateCompetentieGebruikerDto) {
    return this.competentieGebruikerService.create(createCompetentieGebruikerDto);
  }

  @Get()
  findAll() {
    return this.competentieGebruikerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competentieGebruikerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetentieGebruikerDto: UpdateCompetentieGebruikerDto) {
    return this.competentieGebruikerService.update(+id, updateCompetentieGebruikerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competentieGebruikerService.remove(+id);
  }
}
