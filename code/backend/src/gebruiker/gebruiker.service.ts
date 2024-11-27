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
<<<<<<< HEAD
    }
=======
    } 
>>>>>>> b4c0f46a (Gebruiker CRUD)

    const gebruiker = await this.gebruikerRepository.save(data);
    return gebruiker;
  }

  findAll() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep', 'begeleider'],
<<<<<<< HEAD
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
=======
>>>>>>> b4c0f46a (Gebruiker CRUD)
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
    try {
      // Find the user (gebruiker) to add to the subgroep
      const gebruiker = await this.gebruikerRepository.findOne({
        where: { gebruikerID },
        relations: ['rol'],
      });

      if (!gebruiker) {
        throw new Error(`Gebruiker with ID ${gebruikerID} not found`);
      }

      // Find the subgroep where the user will be added
      const subgroep = await this.subgroepRepository.findOne({
        where: { subgroepID },
      });

      if (!subgroep) {
        throw new Error(`Subgroep with ID ${subgroepID} not found`);
      }

      // Check if the user is already in the subgroep (for other roles)
      if (gebruiker.subgroep?.subgroepID === subgroepID) {
        throw new Error(`Gebruiker is already in subgroep ${subgroepID}`);
      }

      // Set the subgroep for the gebruiker
      gebruiker.subgroep = subgroep;

      // If the gebruiker is a begeleider (role ID 2), we need to check if there is already a begeleider
      if (gebruiker.rol?.rolID === 2) {
        // Check if there's already a begeleider in the subgroep
        const existingBegeleider = await this.gebruikerRepository.findOne({
          where: { rol: { rolID: 2 }, subgroep: { subgroepID } },
        });

        if (existingBegeleider) {
          throw new Error(`Subgroep ${subgroepID} already has a begeleider.`);
        }

        // If the gebruiker is a begeleider, update all werknemers to have this begeleider
        await this.updateWerknemersBegeleider(subgroepID, gebruikerID);
      }

      // Save the gebruiker after adding to the subgroep
      const updatedGebruiker = await this.gebruikerRepository.save(gebruiker);

      // If the gebruiker is a werknemer (role ID 3), update the begeleider relationship
      if (gebruiker.rol?.rolID === 3) {
        const begeleider = await this.gebruikerRepository.findOne({
          where: { rol: { rolID: 2 }, subgroep: { subgroepID } },
        });

        if (begeleider) {
          gebruiker.begeleider = begeleider;
          await this.gebruikerRepository.save(gebruiker);
        }
      }

      // Return the updated gebruiker
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
      where: { subgroep: { subgroepID }, rol: { rolID: 3 } }, // rolID 3 for werknemers
      relations: ['begeleider'],
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

  async assignBegeleiderToWerknemer(
    werknemerID: number,
    begeleiderID: number,
  ): Promise<Gebruiker> {
    const werknemer = await this.gebruikerRepository.findOne({
      where: { gebruikerID: werknemerID },
      relations: ['begeleider', 'subgroep', 'rol'],
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
}
