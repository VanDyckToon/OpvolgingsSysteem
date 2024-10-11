import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnischeCompetentieService } from './technische-competentie.service';
import { CreateTechnischeCompetentieDto } from './dto/create-technische-competentie.dto';
import { UpdateTechnischeCompetentieDto } from './dto/update-technische-competentie.dto';

@Controller('technische-competentie')
export class TechnischeCompetentieController {
  constructor(private readonly technischeCompetentieService: TechnischeCompetentieService) {}

  @Post()
  create(@Body() createTechnischeCompetentieDto: CreateTechnischeCompetentieDto) {
    return this.technischeCompetentieService.create(createTechnischeCompetentieDto);
  }

  @Get()
  findAll() {
    return this.technischeCompetentieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technischeCompetentieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnischeCompetentieDto: UpdateTechnischeCompetentieDto) {
    return this.technischeCompetentieService.update(+id, updateTechnischeCompetentieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technischeCompetentieService.remove(+id);
  }
}
