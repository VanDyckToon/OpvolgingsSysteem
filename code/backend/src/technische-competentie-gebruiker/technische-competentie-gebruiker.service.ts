import { Injectable } from '@nestjs/common';
import { CreateTechnischeCompetentieGebruikerDto } from './dto/create-technische-competentie-gebruiker.dto';
import { UpdateTechnischeCompetentieGebruikerDto } from './dto/update-technische-competentie-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnischeCompetentieGebruiker } from './entities/technische-competentie-gebruiker.entity';
import { Competentie } from 'src/competentie/entities/competentie.entity';

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

  async findAllByWerknemer(gebruikerID: number) {
    const competencies = await this.technischeCompetentieGebruikerRepository.find({
      where: { gebruiker: { gebruikerID } },
      relations: ['gebruiker', 'score', 'technischeCompetentie', 'technischeCompetentie.taak'],
      order: {
        technischeCompetentie: { technischeCompetentieID: 'ASC' },
      },
    });

    const taakMap = new Map<number, { taakID: number, taakNaam: string, competentieMap: Map<number, Map<string, any>> }>();

    for (const competency of competencies) {
      const compID = competency.technischeCompetentie.technischeCompetentieID;
      const taak = competency.technischeCompetentie.taak;
      const taakID = taak?.taakID ?? -1;
      const taakNaam = taak?.naam ?? 'Onbekende taak';

      const dateKey = new Date(competency.datumBeoordeeld).toISOString().split('T')[0];

      if (!taakMap.has(taakID)) {
        taakMap.set(taakID, {
          taakID,
          taakNaam,
          competentieMap: new Map(),
        });
      }

      const taakEntry = taakMap.get(taakID)!;

      if (!taakEntry.competentieMap.has(compID)) {
        taakEntry.competentieMap.set(compID, new Map());
      }

      const dateMap = taakEntry.competentieMap.get(compID)!;

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

    for (const { taakID, taakNaam, competentieMap } of taakMap.values()) {
      const competenties = [];

      for (const [compID, dateMap] of competentieMap.entries()) {
        const entries = Array.from(dateMap.values()).sort(
          (a, b) => new Date(a.datumBeoordeeld).getTime() - new Date(b.datumBeoordeeld).getTime()
        );

        const firstEntry = entries[0];
        const { technischeCompetentie } = firstEntry;

        for (const entry of entries) {
          delete entry.technischeCompetentie;
        }

        competenties.push({
          technischeCompetentieID: technischeCompetentie.technischeCompetentieID,
          naam: technischeCompetentie.naam,
          beschrijving: technischeCompetentie.beschrijving,
          beoordeling: entries,
        });
      }

      result.push({
        taakID,
        taakNaam,
        competenties,
      });
    }

    return result;
  }


}
