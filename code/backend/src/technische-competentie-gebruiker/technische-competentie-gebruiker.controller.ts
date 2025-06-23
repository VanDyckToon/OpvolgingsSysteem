import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechnischeCompetentieGebruikerService } from './technische-competentie-gebruiker.service';
import { CreateTechnischeCompetentieGebruikerDto } from './dto/create-technische-competentie-gebruiker.dto';
import { UpdateTechnischeCompetentieGebruikerDto } from './dto/update-technische-competentie-gebruiker.dto';

@Controller('technische-competentie-gebruiker')
export class TechnischeCompetentieGebruikerController {
  constructor(
    private readonly technischeCompetentieGebruikerService: TechnischeCompetentieGebruikerService,
  ) {}

  @Post()
  create(
    @Body()
    createTechnischeCompetentieGebruikerDto: CreateTechnischeCompetentieGebruikerDto,
  ) {
    return this.technischeCompetentieGebruikerService.create(
      createTechnischeCompetentieGebruikerDto,
    );
  }

  @Get()
  findAll() {
    return this.technischeCompetentieGebruikerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technischeCompetentieGebruikerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTechnischeCompetentieGebruikerDto: UpdateTechnischeCompetentieGebruikerDto,
  ) {
    return this.technischeCompetentieGebruikerService.update(
      +id,
      updateTechnischeCompetentieGebruikerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technischeCompetentieGebruikerService.remove(+id);
  }

  @Get('werknemer/:werknemerID')
  findByWerknemer(@Param('werknemerID') werknemerID: number) {
    return this.technischeCompetentieGebruikerService.findByWerknemer(
      werknemerID,
    );
  }

  @Get('werknermer/all/:werknemerID')
  findAllByWerknemer(@Param('werknemerID') werknemerID: number) {
    return this.technischeCompetentieGebruikerService.findAllByWerknemer( werknemerID,);
  }
}
