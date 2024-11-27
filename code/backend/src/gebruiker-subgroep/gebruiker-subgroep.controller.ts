import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GebruikerSubgroepService } from './gebruiker-subgroep.service';
import { CreateGebruikerSubgroepDto } from './dto/create-gebruiker-subgroep.dto';
import { UpdateGebruikerSubgroepDto } from './dto/update-gebruiker-subgroep.dto';

@Controller('gebruiker-subgroep')
export class GebruikerSubgroepController {
  constructor(
    private readonly gebruikerSubgroepService: GebruikerSubgroepService,
  ) {}

  @Post()
  create(@Body() createGebruikerSubgroepDto: CreateGebruikerSubgroepDto) {
    return this.gebruikerSubgroepService.create(createGebruikerSubgroepDto);
  }

  @Get()
  findAll() {
    return this.gebruikerSubgroepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gebruikerSubgroepService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGebruikerSubgroepDto: UpdateGebruikerSubgroepDto,
  ) {
    return this.gebruikerSubgroepService.update(
      +id,
      updateGebruikerSubgroepDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gebruikerSubgroepService.remove(+id);
  }
}
