import { Injectable } from '@nestjs/common';
import { CreateGebruikerDto } from './dto/create-gebruikers.dto';
import { UpdateGebruikerDto } from './dto/update-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gebruiker } from './entities/gebruiker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GebruikerService {
  constructor(
    @InjectRepository(Gebruiker)
    private readonly gebruikerRepository: Repository<Gebruiker>,
  ) {}

  createGebruiker(createGebruikerDto: CreateGebruikerDto) {
    return this.gebruikerRepository.save(createGebruikerDto);
  }

  findAll() {
    return this.gebruikerRepository.find({
      relations: ['rol', 'opleidingGebruikers', 'subgroep'],
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
}
