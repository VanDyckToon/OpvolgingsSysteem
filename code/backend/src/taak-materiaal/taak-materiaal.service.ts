import { Injectable } from '@nestjs/common';
import { CreateTaakMateriaalDto } from './dto/create-taak-materiaal.dto';
import { UpdateTaakMateriaalDto } from './dto/update-taak-materiaal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaakMateriaal } from './entities/taak-materiaal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaakMateriaalService {
  constructor(
    @InjectRepository(TaakMateriaal)
    private readonly taakMateriaalRepository: Repository<TaakMateriaal>,
  ) {}
  create(createTaakMateriaalDto: CreateTaakMateriaalDto) {
    return this.taakMateriaalRepository.save(createTaakMateriaalDto);
  }

  findAll() {
    return this.taakMateriaalRepository.find();
  }

  findOne(taakMateriaalID: number) {
    return this.taakMateriaalRepository.findOneBy({ taakMateriaalID });
  }

  update(taakMateriaalID: number, updateTaakMateriaalDto: UpdateTaakMateriaalDto) {
    return this.taakMateriaalRepository.update(taakMateriaalID, updateTaakMateriaalDto);
  }

  remove(taakMateriaalID: number) {
    return this.taakMateriaalRepository.delete({ taakMateriaalID });
  }
}
