import { Injectable } from '@nestjs/common';
import { CreateCompetentieDto } from './dto/create-competentie.dto';
import { UpdateCompetentieDto } from './dto/update-competentie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competentie } from './entities/competentie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompetentieService {
  constructor(
    @InjectRepository(Competentie)
    private readonly competentieRepository: Repository<Competentie>,
  ) {}

  create(createCompetentieDto: CreateCompetentieDto) {
    return this.competentieRepository.save(createCompetentieDto);
  }

  findAll() {
    return this.competentieRepository.find();
  }

  findOne(competentieID: number) {
    return this.competentieRepository.findOneBy({ competentieID });
  }

  update(competentieID: number, updateCompetentieDto: UpdateCompetentieDto) {
    return this.competentieRepository.update(
      competentieID,
      updateCompetentieDto,
    );
  }

  remove(competentieID: number) {
    return this.competentieRepository.delete({ competentieID });
  }
}
