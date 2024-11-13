import { Injectable } from '@nestjs/common';
import { CreateSubgroepDto } from './dto/create-subgroep.dto';
import { UpdateSubgroepDto } from './dto/update-subgroep.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subgroep } from './entities/subgroep.entity';
import { Repository } from 'typeorm';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';

@Injectable()
export class SubgroepService {
  constructor(
    @InjectRepository(Subgroep)
    private readonly subgroepRepository: Repository<Subgroep>,
  ) {}

  async create(createSubgroepDto: CreateSubgroepDto) {
    return this.subgroepRepository.save(createSubgroepDto);
  }

  async findAll() {
    // Fetch subgroepen with their associated groepen
    return this.subgroepRepository.find({ relations: ['groep'] });
  }

  async findOne(subgroepID: number) {
    return this.subgroepRepository.findOne({
      where: { subgroepID },
      relations: ['groep'],
    });
  }

  async update(subgroepID: number, updateSubgroepDto: UpdateSubgroepDto) {
    return this.subgroepRepository.update(subgroepID, updateSubgroepDto);
  }

  async remove(subgroepID: number) {
    return this.subgroepRepository.delete({ subgroepID });
  }
  async getGebruikersBySubgroep(subgroepID: number): Promise<Gebruiker[]> {
    const subgroep = await this.subgroepRepository.findOne({
      where: { subgroepID },
      relations: ['gebruikers', 'gebruikers.rol'],
    });

    if (!subgroep) {
      throw new Error(`Subgroep with ID ${subgroepID} not found`);
    }

    return subgroep.gebruikers;
  }
}
