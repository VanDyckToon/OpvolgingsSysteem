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
    }

    const gebruiker = await this.gebruikerRepository.save(data);
    return gebruiker;
  }

  findAll() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep', 'begeleiders'],
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
      where: { begeleiders: { gebruikerID: begeleiderID } },
      relations: ['begeleiders'],
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
    try {
      const gebruiker = await this.gebruikerRepository.findOne({
        where: { gebruikerID },
        relations: ['rol', 'begeleiders', 'subgroep'],
      });

      if (!gebruiker) {
        throw new Error(`Gebruiker with ID ${gebruikerID} not found`);
      }

      const subgroep = await this.subgroepRepository.findOne({
        where: { subgroepID },
      });

      if (!subgroep) {
        throw new Error(`Subgroep with ID ${subgroepID} not found`);
      }

      if (gebruiker.subgroep?.subgroepID === subgroepID) {
        throw new Error(`Gebruiker is already in subgroep ${subgroepID}`);
      }

      gebruiker.subgroep = subgroep;

      if (gebruiker.rol?.rolID === 2) {
        const existingBegeleider = await this.gebruikerRepository.findOne({
          where: { rol: { rolID: 2 }, subgroep: { subgroepID } },
        });

        if (existingBegeleider) {
          throw new Error(`Subgroep ${subgroepID} already has a begeleider.`);
        }

        await this.updateWerknemersBegeleider(subgroepID, gebruikerID);
      }

      const updatedGebruiker = await this.gebruikerRepository.save(gebruiker);

      if (gebruiker.rol?.rolID === 3) {
        const begeleider = await this.gebruikerRepository.findOne({
          where: { rol: { rolID: 2 }, subgroep: { subgroepID } },
        });

        if (begeleider) {
          gebruiker.begeleiders = gebruiker.begeleiders || [];
          gebruiker.begeleiders.push(begeleider);
          await this.gebruikerRepository.save(gebruiker);
        }
      }

      return updatedGebruiker;
    } catch (error) {
      console.error('Error in addToSubgroep:', error.message, error.stack);
      throw new Error('Failed to add gebruiker to subgroep.');
    }
  }

  async updateWerknemersBegeleider(
    subgroepID: number,
    begeleiderID: number,
  ): Promise<void> {
    const werknemers = await this.gebruikerRepository.find({
      where: { subgroep: { subgroepID }, rol: { rolID: 3 } },
      relations: ['begeleiders'],
    });

    const begeleider = await this.gebruikerRepository.findOne({
      where: { gebruikerID: begeleiderID },
    });

    if (!begeleider) {
      throw new Error('Begeleider not found');
    }

    for (const werknemer of werknemers) {
      werknemer.begeleiders = werknemer.begeleiders || [];
      werknemer.begeleiders.push(begeleider);
      await this.gebruikerRepository.save(werknemer);
    }
  }

  async findById(gebruikerID: number): Promise<Gebruiker> {
    return this.gebruikerRepository.findOne({ where: { gebruikerID } });
  }

  async updateWachtwoord(
    gebruikerID: number,
    nieuwWachtwoord: string,
  ): Promise<void> {
    if (!nieuwWachtwoord || typeof nieuwWachtwoord !== 'string') {
      throw new Error('A valid password is required');
    }

    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID },
    });
    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nieuwWachtwoord, saltRounds);

    gebruiker.wachtwoord = hashedPassword;
    await this.gebruikerRepository.save(gebruiker);
  }
  async assignBegeleider(gebruikerID: number, begeleiderID: number) {
    // Fetch the gebruiker from the repository
    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID },
      relations: ['begeleiders'], // Include relations to fetch begeleiders
    });

    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }

    // Fetch the begeleider from the repository
    const begeleider = await this.gebruikerRepository.findOne({
      where: { gebruikerID: begeleiderID },
    });

    if (!begeleider) {
      throw new Error('Begeleider not found');
    }

    // Initialize gebruiker.begeleiders if it's undefined or null
    gebruiker.begeleiders = gebruiker.begeleiders || [];

    // Check if the begeleider is already assigned to the gebruiker
    if (gebruiker.begeleiders.some((b) => b.gebruikerID === begeleiderID)) {
      throw new Error('Begeleider already assigned to this gebruiker');
    }

    // Add the begeleider to the gebruiker.begeleiders array
    gebruiker.begeleiders.push(begeleider);

    // Save the updated gebruiker
    await this.gebruikerRepository.save(gebruiker);

    // Return the gebruiker with the updated begeleiders relation
    return this.gebruikerRepository.findOne({
      where: { gebruikerID },
      relations: ['begeleiders'],
    });
  }
}
