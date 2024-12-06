import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { CreateGebruikerDto } from './dto/create-gebruikers.dto';
import { UpdateGebruikerDto } from './dto/update-gebruiker.dto';
import { Gebruiker } from './entities/gebruiker.entity';
import * as bcrypt from 'bcrypt';

@Controller('gebruiker')
export class GebruikerController {
  constructor(private readonly gebruikerService: GebruikerService) {}

  @Post()
  async createGebruiker(@Body() createGebruikerDto: CreateGebruikerDto) {
    return this.gebruikerService.createGebruiker(createGebruikerDto);
  }

  @Get()
  findAll() {
    return this.gebruikerService.findAll();
  }

  @Get('gebruikersZonderAdmin')
  findAllWithoutAdmin() {
    return this.gebruikerService.findAllWithoutAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gebruikerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGebruikerDto: UpdateGebruikerDto,
  ) {
    return this.gebruikerService.update(+id, updateGebruikerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gebruikerService.remove(+id);
  }

  @Get('rol/:rolID')
  async getGebruikersByRol(
    @Param('rolID') rolID: number,
  ): Promise<Gebruiker[]> {
    return this.gebruikerService.getGebruikersByRol(rolID);
  }

  @Get('begeleider/:id')
  async getAllGebruikersVanBegeleider(
    @Param('id') begeleiderID: number,
  ): Promise<Gebruiker[]> {
    return this.gebruikerService.getAllGebruikersVanBegeleider(begeleiderID);
  }

  @Get(':id/subgroep')
  async getSubgroep(@Param('id') id: string) {
    return this.gebruikerService.getSubgroepByGebruikerID(+id);
  }

  @Patch(':gebruikerID/removeFromSubgroep')
  async removeFromSubgroep(@Param('gebruikerID') gebruikerID: number) {
    return this.gebruikerService.removeFromSubgroep(gebruikerID);
  }
  @Patch(':gebruikerID/addToSubgroep/:subgroepID')
  async addToSubgroep(
    @Param('gebruikerID') gebruikerID: number,
    @Param('subgroepID') subgroepID: number,
  ) {
    const gebruiker = await this.gebruikerService.addToSubgroep(
      gebruikerID,
      subgroepID,
    );

    // If the gebruiker is a begeleider, update all werknemers in the subgroep
    if (gebruiker.rol?.rolID === 2) {
      // Update all werknemers to have this new begeleider
      await this.gebruikerService.updateWerknemersBegeleider(
        subgroepID,
        gebruiker.gebruikerID,
      );
    }

    return { message: 'Gebruiker added to subgroep successfully' };
  }

  // Endpoint to update all werknemers' begeleiderID when a new begeleider is added
  @Patch('subgroep/:subgroepID/updateBegeleider/:begeleiderID')
  async updateBegeleiderForWerknemers(
    @Param('subgroepID') subgroepID: number,
    @Param('begeleiderID') begeleiderID: number,
  ) {
    await this.gebruikerService.updateWerknemersBegeleider(
      subgroepID,
      begeleiderID,
    );
    return { message: 'Begeleider updated for all werknemers in subgroep' };
  }

  //wachtwoord verificatie
  @Post('wachtwoord')
  async wachtwoord(
    @Body() body: { wachtwoord: string; gebruikerID: number }, // Expect wachtwoord and gebruikerID in body
  ) {
    console.log('Received request to verify password');
    console.log('Request Body:', body); // Log the body to check received values

    const { wachtwoord, gebruikerID } = body;

    if (!gebruikerID) {
      console.log('No gebruikerID provided');
      throw new UnauthorizedException('No gebruikerID provided');
    }

    // Find the gebruiker by gebruikerID
    const gebruiker = await this.gebruikerService.findById(gebruikerID);
    if (!gebruiker) {
      console.log('User not found');
      throw new UnauthorizedException('Gebruiker niet gevonden');
    }

    console.log('User found:', gebruiker); // Log the found gebruiker

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(wachtwoord, gebruiker.wachtwoord);
    if (isMatch) {
      console.log('Password match');
      return { valid: true }; // Password is correct
    } else {
      console.log('Incorrect password');
      throw new UnauthorizedException('Wachtwoord is onjuist');
    }
  }

  @Patch(':gebruikerID/wachtwoord')
  async updateWachtwoord(
    @Param('gebruikerID') gebruikerID: number,
    @Body('wachtwoord') nieuwWachtwoord: string,
  ) {
    return this.gebruikerService.updateWachtwoord(gebruikerID, nieuwWachtwoord);
  }
  @Post(':gebruikerID/begeleiders/:begeleiderID')
  async assignBegeleider(
    @Param('gebruikerID') gebruikerID: number,
    @Param('begeleiderID') begeleiderID: number,
  ) {
    return this.gebruikerService.assignBegeleider(gebruikerID, begeleiderID);
  }
}
