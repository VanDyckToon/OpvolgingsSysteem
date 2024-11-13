import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';
import { CreateOpleidingGebruikerDto } from './dto/create-opleiding-gebruiker.dto';
import { UpdateOpleidingGebruikerDto } from './dto/update-opleiding-gebruiker.dto';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Opleiding } from '../opleiding/entities/opleiding.entity';

@Controller('opleiding-gebruiker')
export class OpleidingGebruikerController {
  constructor(
    private readonly opleidingGebruikerService: OpleidingGebruikerService,
  ) {}

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
  update(
    @Param('id') id: string,
    @Body() updateOpleidingGebruikerDto: UpdateOpleidingGebruikerDto,
  ) {
    return this.opleidingGebruikerService.update(
      +id,
      updateOpleidingGebruikerDto,
    );
  }

  @Get('opleiding/:opleidingID')
  async getGebruikersByOpleiding(
    @Param('opleidingID') opleidingID: number,
  ): Promise<Gebruiker[]> {
    return this.opleidingGebruikerService.getGebruikersByOpleiding(opleidingID);
  }

  @Get('gebruiker/:gebruikerID')
  async getOpleidingenByGebruiker(
    @Param('gebruikerID') gebruikerID: number,
  ): Promise<Opleiding[]> {
    return this.opleidingGebruikerService.getOpleidingenByGebruiker(
      gebruikerID,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opleidingGebruikerService.remove(+id);
  }

  @Delete('opleiding/:opleidingID/gebruiker/:gebruikerID')
  async removeUserFromOpleiding(
    @Param('opleidingID') opleidingID: number,
    @Param('gebruikerID') gebruikerID: number,
  ) {
    return this.opleidingGebruikerService.removeByOpleidingAndGebruiker(
      opleidingID,
      gebruikerID,
    );
  }
  @Get('check/:opleidingID/:gebruikerID')
  async checkGebruikerToOpleiding(
    @Param('opleidingID') opleidingID: number,
    @Param('gebruikerID') gebruikerID: number,
  ) {
    const exists = await this.opleidingGebruikerService.checkUserInOpleiding(
      opleidingID,
      gebruikerID,
    );
    return { exists };
  }
}
