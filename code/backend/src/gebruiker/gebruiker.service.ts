import { Injectable } from '@nestjs/common';
import { CreateGebruikerDto } from './dto/create-gebruikers.dto';
import { UpdateGebruikerDto } from './dto/update-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gebruiker } from './entities/gebruiker.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Subgroep } from '../subgroep/entities/subgroep.entity';

@Injectable()
export class GebruikerService {
  constructor(
    @InjectRepository(Gebruiker)
    private readonly gebruikerRepository: Repository<Gebruiker>,
    @InjectRepository(Subgroep)
    private readonly subgroepRepository: Repository<Subgroep>,
  ) {}

  async createGebruiker(data: CreateGebruikerDto): Promise<Gebruiker> {
    const { wachtwoord, rol } = data;

    if (rol && rol.rolID !== 3) {
      if (wachtwoord) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(wachtwoord, saltRounds);
        data.wachtwoord = hashedPassword;
      } else {
        throw new Error('Password is required');
      }
    } else {
      data.wachtwoord = null;
      //data.email = null;
    }

    const gebruiker = await this.gebruikerRepository.save(data);
    return gebruiker;
  }

  findAll() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep', 'begeleider'],
    });
  }

  findAllWithoutAdmin() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep'],
      where: {
        rol: {
          rolID: Not(1),
        },
      },
    });
  }

  async findOne(gebruikerID: number): Promise<Gebruiker> {
    return this.gebruikerRepository.findOne({
      where: { gebruikerID },
      relations: ['rol', 'opleidingGebruikers', 'subgroep'],
    });
  }

  async update(gebruikerID: number, updateGebruikerDto: UpdateGebruikerDto) {
    return this.gebruikerRepository.update(gebruikerID, updateGebruikerDto);
  }

  remove(gebruikerID: number) {
    return this.gebruikerRepository.delete({ gebruikerID });
  }

  async findGebruikerByEmail(email: string): Promise<Gebruiker | undefined> {
    return this.gebruikerRepository.findOne({
      where: { email },
      relations: ['rol'],
    });
  }

  async getAllGebruikersVanBegeleider(
    begeleiderID: number,
  ): Promise<Gebruiker[]> {
    return this.gebruikerRepository.find({
      where: { begeleider: { gebruikerID: begeleiderID } },
      relations: ['begeleider'],
    });
  }

  async getGebruikersByRol(rolID: number): Promise<Gebruiker[]> {
    return this.gebruikerRepository.find({
      where: { rol: { rolID: rolID } },
      relations: ['rol', 'subgroep'],
    });
  }
  async getSubgroepByGebruikerID(gebruikerID: number): Promise<any> {
    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID },
      relations: ['subgroep'],
    });
    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }
    return gebruiker.subgroep;
  }

  async removeFromSubgroep(gebruikerID: number): Promise<Gebruiker> {
    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID },
    });

    if (!gebruiker) {
      throw new Error('User not found');
    }
    gebruiker.subgroep = null;
    return this.gebruikerRepository.save(gebruiker);
  }

  async addToSubgroep(
    gebruikerID: number,
    subgroepID: number,
  ): Promise<Gebruiker> {
    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID },
      relations: ['rol'],
    });
    const subgroep = await this.subgroepRepository.findOne({
      where: { subgroepID },
    });

    if (!gebruiker || !subgroep) {
      throw new Error('Gebruiker of subgroep niet gevonden');
    }

    gebruiker.subgroep = subgroep;

    if (gebruiker.rol?.rolID === 2) {
      // Begeleider
      await this.updateWerknemersBegeleider(subgroepID, gebruikerID);
    }

    await this.gebruikerRepository.save(gebruiker);

    if (gebruiker.rol?.rolID === 3) {
      // Werknemer
      const begeleider = await this.gebruikerRepository.findOne({
        where: { rol: { rolID: 2 }, subgroep: { subgroepID } },
      });

      if (begeleider) {
        gebruiker.begeleider = begeleider;
        await this.gebruikerRepository.save(gebruiker);
      }
    }

    return gebruiker;
  }

  async updateWerknemersBegeleider(
    subgroepID: number,
    begeleiderID: number,
  ): Promise<void> {
    const werknemers = await this.gebruikerRepository.find({
      where: { subgroep: { subgroepID }, rol: { rolID: 3 } }, // Assuming 3 is the ID for werknemers
    });

    const begeleider = await this.gebruikerRepository.findOne({
      where: { gebruikerID: begeleiderID },
    });

    if (!begeleider) {
      throw new Error('Begeleider not found');
    }

    for (const werknemer of werknemers) {
      werknemer.begeleider = begeleider;
      await this.gebruikerRepository.save(werknemer);
    }
  }

    //voorwachtwoorden aan te passen
  async findById(gebruikerID: number): Promise<Gebruiker> {
    return this.gebruikerRepository.findOne({ where: { gebruikerID } });
  }

  async assignBegeleiderToWerknemer(
    werknemerID: number,
    begeleiderID: number,
  ): Promise<Gebruiker> {
    const werknemer = await this.gebruikerRepository.findOne({
      where: { gebruikerID: werknemerID },
    });

    if (!werknemer) {
      throw new Error('Werknemer not found');
    }

    const begeleider = await this.gebruikerRepository.findOne({
      where: { gebruikerID: begeleiderID },
    });

    if (!begeleider) {
      throw new Error('Begeleider not found');
    }

    // Set the "begeleider" property, not "begeleiderID"
    werknemer.begeleider = begeleider;
    return this.gebruikerRepository.save(werknemer);
  }

  async updateWachtwoord(gebruikerID: number, nieuwWachtwoord: string): Promise<void> {
    if (!nieuwWachtwoord || typeof nieuwWachtwoord !== 'string') {
      throw new Error('A valid password is required');
    }
  
    const gebruiker = await this.gebruikerRepository.findOne({ where: { gebruikerID } });
    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nieuwWachtwoord, saltRounds);  // Ensure nieuwWachtwoord is valid
  
    gebruiker.wachtwoord = hashedPassword;
    await this.gebruikerRepository.save(gebruiker);
  }
  
}
