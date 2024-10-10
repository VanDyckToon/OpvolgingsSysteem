import { Injectable } from '@nestjs/common';
import { CreateGroepDto } from './dto/create-groep.dto';
import { UpdateGroepDto } from './dto/update-groep.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Groep } from './entities/groep.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroepService {
  constructor(
    @InjectRepository(Groep)
    private readonly groepRespository: Repository<Groep>,
  ) {}
  create(createGroepDto: CreateGroepDto) {
    return this.groepRespository.save(createGroepDto);
  }

  findAll() {
    return this.groepRespository.find();
  }

  findOne(groepID: number) {
    return this.groepRespository.findOneBy({ groepID });
  }

  update(groepID: number, updateGroepDto: UpdateGroepDto) {
    return this.groepRespository.update(groepID, updateGroepDto);
  }

  remove(groepID: number) {
    return this.groepRespository.delete({ groepID });
  }
}
