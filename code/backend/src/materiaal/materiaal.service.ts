import { Injectable } from '@nestjs/common';
import { CreateMateriaalDto } from './dto/create-materiaal.dto';
import { UpdateMateriaalDto } from './dto/update-materiaal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materiaal } from './entities/materiaal.entity';

@Injectable()
export class MateriaalService {
  constructor(
    @InjectRepository(Materiaal)
    private readonly materiaalRepository: Repository<Materiaal>,
  ) {}
  create(createMateriaalDto: CreateMateriaalDto) {
    return this.materiaalRepository.save(createMateriaalDto);
  }

  findAll() {
    return this.materiaalRepository.find();
  }

  findOne(materiaalID: number) {
    return this.materiaalRepository.findOneBy({ materiaalID });
  }

  update(materiaalID: number, updateMateriaalDto: UpdateMateriaalDto) {
    return this.materiaalRepository.update(materiaalID, updateMateriaalDto);
  }

  remove(materiaalID: number) {
    return this.materiaalRepository.delete({ materiaalID });
  }
}
