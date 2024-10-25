import { Injectable } from '@nestjs/common';
import { CreateTaakDto } from './dto/create-taak.dto';
import { UpdateTaakDto } from './dto/update-taak.dto';
import { Repository } from 'typeorm';
import { Taak } from './entities/taak.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaakService {
  constructor(
    @InjectRepository(Taak)
    private readonly taakRepository: Repository<Taak>,
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
}
