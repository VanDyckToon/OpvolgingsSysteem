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
      data.email = null;
    }

    const gebruiker = await this.gebruikerRepository.save(data);
    return gebruiker;
  }

  findAll() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep'],
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

  update(gebruikerID: number, updateGebruikerDto: UpdateGebruikerDto) {
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
    });
    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }
    const subgroep = await this.subgroepRepository.findOne({
      where: { subgroepID },
    });
    if (!subgroep) {
      throw new Error('Subgroep not found');
    }
    gebruiker.subgroep = subgroep;
    return this.gebruikerRepository.save(gebruiker);
  }
}
