import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetentieService } from './competentie.service';
import { CreateCompetentieDto } from './dto/create-competentie.dto';
import { UpdateCompetentieDto } from './dto/update-competentie.dto';

@Controller('competentie')
export class CompetentieController {
  constructor(private readonly competentieService: CompetentieService) {}

  @Post()
  create(@Body() createCompetentieDto: CreateCompetentieDto) {
    return this.competentieService.create(createCompetentieDto);
  }

  @Get()
  findAll() {
    return this.competentieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competentieService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetentieDto: UpdateCompetentieDto,
  ) {
    return this.competentieService.update(+id, updateCompetentieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competentieService.remove(+id);
  }
}
