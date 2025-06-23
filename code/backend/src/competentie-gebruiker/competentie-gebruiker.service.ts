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

  async findAverageByWerknemer(gebruikerID: number) {
    const competencies = await this.competentieGebruikerRepository.find({
      where: { gebruiker: { gebruikerID: gebruikerID } },
      relations: ['gebruiker', 'score', 'competentie'],
      order: {
        competentie: { competentieID: 'ASC' },
      },
    });

    // Always fetch the gebruiker, even if there are no competencies
    let gebruiker = null;
    if (competencies.length > 0) {
      gebruiker = competencies[0].gebruiker;
    } else {
      // Fetch the gebruiker directly if no competencies found
      const gebruikerRecord = await this.competentieGebruikerRepository.manager.findOne('Gebruiker', {
        where: { gebruikerID },
      });
      gebruiker = gebruikerRecord || null;
    }

    const scoreMap = new Map<number, { competentie: any, scores: number[] }>();

    for (const competency of competencies) {
      const compID = competency.competentie.competentieID;
      const scoreValue = competency.score?.waarde;

      if (typeof scoreValue === 'number') {
        if (!scoreMap.has(compID)) {
          scoreMap.set(compID, {
            competentie: competency.competentie,
            scores: [],
          });
        }
        scoreMap.get(compID)!.scores.push(scoreValue);
      }
    }

    const competentiesGemiddeld = [];

    for (const { competentie, scores } of scoreMap.values()) {
      const gemiddelde =
        scores.reduce((sum, val) => sum + val, 0) / scores.length;

      competentiesGemiddeld.push({
        competentie,
        gemiddeldeScore: parseFloat(gemiddelde.toFixed(2)),
        aantalBeoordelingen: scores.length,
      });
    }

    return {
      gebruiker,
      competentiesGemiddeld,
    };
}

  async findAllByWerknemer(gebruikerID: number) {
    const competencies = await this.competentieGebruikerRepository.find({
      where: { gebruiker: { gebruikerID } },
      relations: ['gebruiker', 'score', 'competentie'],
      order: {
        competentie: { competentieID: 'ASC'},
      },
    });

    const compMap = new Map<number, Map<string, any>>();

    for (const competency of competencies) {
      const compID = competency.competentie.competentieID;
      const dateKey = new Date(competency.datumBeoordeeld).toISOString().split('T')[0];

      if (!compMap.has(compID)) {
        compMap.set(compID, new Map());
      }

      const dateMap = compMap.get(compID)!;

      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, competency);
      } else {
        const existing = dateMap.get(dateKey);
        if (new Date(competency.datumBeoordeeld) > new Date(existing.datumBeoordeeld)) {
          dateMap.set(dateKey, competency);
        }
      }
    }

    const result = [];

    for (const [compID, dateMap] of compMap.entries()) {
      const entries = Array.from(dateMap.values()).sort(
        (a, b) =>
          new Date(a.datumBeoordeeld).getTime() - new Date(b.datumBeoordeeld).getTime()
      );

      result.push({
        competentieID: compID,
        beoordelingen: entries,
      });
    }

    return result;
  }

  

}
