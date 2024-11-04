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
    return this.competentieGebruikerRepository.save(
      createCompetentieGebruikerDto,
    );
  }

  findAll() {
    return this.competentieGebruikerRepository.find();
  }

  findOne(competentieGebruikerID: number) {
    return this.competentieGebruikerRepository.findOneBy({
      competentieGebruikerID,
    });
  }

  update(
    competentieGebruikerID: number,
    updateCompetentieGebruikerDto: UpdateCompetentieGebruikerDto,
  ) {
    return this.competentieGebruikerRepository.update(
      competentieGebruikerID,
      updateCompetentieGebruikerDto,
    );
  }

  remove(competentieGebruikerID: number) {
    return this.competentieGebruikerRepository.delete({
      competentieGebruikerID,
    });
  }

  async findByWerknemer(gebruikerID: number) {
    const competencies = await this.competentieGebruikerRepository.find({
      where: { gebruiker: { gebruikerID } },
      relations: ['gebruiker', 'score', 'competentie'],
      order: {
        competentie: { competentieID: 'ASC' },
      },
    });

    const lastCompetenciesMap = new Map<number, any>();

    for (const competency of competencies) {
      if (!lastCompetenciesMap.has(competency.competentie.competentieID)) {
        lastCompetenciesMap.set(
          competency.competentie.competentieID,
          competency,
        );
      } else {
        const existingCompetency = lastCompetenciesMap.get(
          competency.competentie.competentieID,
        );
        if (competency.datumBeoordeeld > existingCompetency.datumBeoordeeld) {
          lastCompetenciesMap.set(
            competency.competentie.competentieID,
            competency,
          );
        }
      }
    }

    return Array.from(lastCompetenciesMap.values()).sort(
      (a, b) => a.competentie.competentieID - b.competentie.competentieID,
    );
  }
}
