import { Injectable } from '@nestjs/common';
import { CreateTechnischeCompetentieDto } from './dto/create-technische-competentie.dto';
import { UpdateTechnischeCompetentieDto } from './dto/update-technische-competentie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnischeCompetentie } from './entities/technische-competentie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechnischeCompetentieService {
  constructor(
    @InjectRepository(TechnischeCompetentie)
    private readonly technischeCompetentieRepository: Repository<TechnischeCompetentie>,
  ) {}
  create(createTechnischeCompetentieDto: CreateTechnischeCompetentieDto) {
    return this.technischeCompetentieRepository.save(
      createTechnischeCompetentieDto,
    );
  }

  findAll() {
    return this.technischeCompetentieRepository.find({ relations: ['taak', 'taak.groep'] });
  }

  findOne(technischeCompetentieID: number) {
    return this.technischeCompetentieRepository.findOne({
      where: { technischeCompetentieID },
      relations: ['taak', 'taak.groep'],
    });
  }

  async update(technischeCompetentieID: number, updateTechnischeCompetentieDto: UpdateTechnischeCompetentieDto) {
    return this.technischeCompetentieRepository.update(technischeCompetentieID, updateTechnischeCompetentieDto);
  }

  async remove(technischeCompetentieID: number) {
    return this.technischeCompetentieRepository.delete({ technischeCompetentieID });
  }
}
