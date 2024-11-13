import { Injectable } from '@nestjs/common';
import { CreateTechnischeCompetentieGebruikerDto } from './dto/create-technische-competentie-gebruiker.dto';
import { UpdateTechnischeCompetentieGebruikerDto } from './dto/update-technische-competentie-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnischeCompetentieGebruiker } from './entities/technische-competentie-gebruiker.entity';

@Injectable()
export class TechnischeCompetentieGebruikerService {
  constructor(
    @InjectRepository(TechnischeCompetentieGebruiker)
    private readonly technischeCompetentieGebruikerRepository: Repository<TechnischeCompetentieGebruiker>,
  ) {}
  create(
    createTechnischeCompetentieGebruikerDto: CreateTechnischeCompetentieGebruikerDto,
  ) {
    return this.technischeCompetentieGebruikerRepository.save(
      createTechnischeCompetentieGebruikerDto,
    );
  }

  findAll() {
    return this.technischeCompetentieGebruikerRepository.find();
  }

  findOne(technischeCompetentieGebruikerID: number) {
    return this.technischeCompetentieGebruikerRepository.findOneBy({
      technischeCompetentieGebruikerID,
    });
  }

  update(
    technischeCompetentieGebruikerID: number,
    updateTechnischeCompetentieGebruikerDto: UpdateTechnischeCompetentieGebruikerDto,
  ) {
    return this.technischeCompetentieGebruikerRepository.update(
      technischeCompetentieGebruikerID,
      updateTechnischeCompetentieGebruikerDto,
    );
  }

  remove(technischeCompetentieGebruikerID: number) {
    return this.technischeCompetentieGebruikerRepository.delete({
      technischeCompetentieGebruikerID,
    });
  }
  async findByWerknemer(gebruikerID: number) {
    const competencies =
      await this.technischeCompetentieGebruikerRepository.find({
        where: { gebruiker: { gebruikerID } },
        relations: ['gebruiker', 'score', 'technischeCompetentie'],
        order: {
          technischeCompetentie: { technischeCompetentieID: 'ASC' },
        },
      });

    const lastCompetenciesMap = new Map<number, any>();

    for (const competency of competencies) {
      if (
        !lastCompetenciesMap.has(
          competency.technischeCompetentie.technischeCompetentieID,
        )
      ) {
        lastCompetenciesMap.set(
          competency.technischeCompetentie.technischeCompetentieID,
          competency,
        );
      } else {
        const existingCompetency = lastCompetenciesMap.get(
          competency.technischeCompetentie.technischeCompetentieID,
        );
        if (competency.datumBeoordeeld > existingCompetency.datumBeoordeeld) {
          lastCompetenciesMap.set(
            competency.technischeCompetentie.technischeCompetentieID,
            competency,
          );
        }
      }
    }

    return Array.from(lastCompetenciesMap.values()).sort(
      (a, b) =>
        a.technischeCompetentie.technischeCompetentie -
        b.technischeCompetentie.technischeCompetentieID,
    );
  }
}
