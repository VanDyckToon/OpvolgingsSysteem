import { Injectable } from '@nestjs/common';
import { CreateTaakDto } from './dto/create-taak.dto';
import { UpdateTaakDto } from './dto/update-taak.dto';
import { In, Repository } from 'typeorm';
import { Taak } from './entities/taak.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';

@Injectable()
export class TaakService {
  constructor(
    @InjectRepository(Taak)
    private readonly taakRepository: Repository<Taak>,
    @InjectRepository(Gebruiker)
    private readonly gebruikerRepository: Repository<Gebruiker>,
  ) {}

  async create(createTaakDto: CreateTaakDto) {
    return this.taakRepository.save(createTaakDto);
  }

  async findAll() {
    return this.taakRepository.find({ relations: ['groep'] });
  }

  async findOne(taakID: number) {
    return this.taakRepository.findOne({
      where: { taakID },
      relations: ['groep'],
    });
  }

  async update(taakID: number, updateTaakDto: UpdateTaakDto) {
    return this.taakRepository.update(taakID, updateTaakDto);
  }

  async remove(taakID: number) {
    return this.taakRepository.delete({ taakID });
  }

  async getTakenVoorGebruiker(gebruikerID: number): Promise<Taak[]> {
    const gebruiker = await this.gebruikerRepository.findOne({
      where: { gebruikerID: gebruikerID },
      relations: [
        'gebruikersSubgroep',
        'gebruikersSubgroep.subgroep',
        'gebruikersSubgroep.subgroep.groep',
      ],
    });

    if (!gebruiker) {
      throw new Error('Gebruiker not found');
    }

    const groepIDs = gebruiker.gebruikersSubgroep
      .map((gebruikersSubgroep) => gebruikersSubgroep.subgroep?.groep?.groepID)
      .filter((groepID) => groepID != null);

    if (groepIDs.length === 0) {
      return [];
    }
    const taken = await this.taakRepository.find({
      where: { groep: { groepID: In(groepIDs) } },
      relations: ['groep', 'technischeCompetenties'],
    });
    return taken;
  }
}
