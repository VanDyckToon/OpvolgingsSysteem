import { Injectable } from '@nestjs/common';
import { CreateOpleidingGebruikerDto } from './dto/create-opleiding-gebruiker.dto';
import { UpdateOpleidingGebruikerDto } from './dto/update-opleiding-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OpleidingGebruiker } from './entities/opleiding-gebruiker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OpleidingGebruikerService {
  constructor(
    @InjectRepository(OpleidingGebruiker)
    private readonly opleidingGebruikerRepository: Repository<OpleidingGebruiker>,
  ) {}
  create(createOpleidingGebruikerDto: CreateOpleidingGebruikerDto) {
    return this.opleidingGebruikerRepository.save(createOpleidingGebruikerDto);
  }

  findAll() {
    return this.opleidingGebruikerRepository.find();
  }

  findOne(opleidingGebruikerID: number) {
    return this.opleidingGebruikerRepository.findOneBy({ opleidingGebruikerID });
  }

  update(opleidingGebruikerID: number, updateOpleidingGebruikerDto: UpdateOpleidingGebruikerDto) {
    return this.opleidingGebruikerRepository.update(opleidingGebruikerID, updateOpleidingGebruikerDto);
  }

  remove(opleidingGebruikerID: number) {
    return this.opleidingGebruikerRepository.delete({ opleidingGebruikerID });
  }
}
