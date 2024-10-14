import { Injectable } from '@nestjs/common';
import { CreateCompetentieGebruikerDto } from './dto/create-competentie-gebruiker.dto';
import { UpdateCompetentieGebruikerDto } from './dto/update-competentie-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetentieGebruiker } from './entities/competentie-gebruiker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompetentieGebruikerService {
  constructor(
    @InjectRepository(CompetentieGebruiker)
    private readonly competentieGebruikerRepository: Repository<CompetentieGebruiker>,
  ) {}
  create(createCompetentieGebruikerDto: CreateCompetentieGebruikerDto) {
    return this.competentieGebruikerRepository.save(createCompetentieGebruikerDto);
  }

  findAll() {
    return this.competentieGebruikerRepository.find();
  }

  findOne(competentieGebruikerID: number) {
    return this.competentieGebruikerRepository.findOneBy({ competentieGebruikerID });
  }

  update(competentieGebruikerID: number, updateCompetentieGebruikerDto: UpdateCompetentieGebruikerDto) {
    return this.competentieGebruikerRepository.update(competentieGebruikerID, updateCompetentieGebruikerDto);
  }

  remove(competentieGebruikerID: number) {
    return this.competentieGebruikerRepository.delete({ competentieGebruikerID });
  }
}
