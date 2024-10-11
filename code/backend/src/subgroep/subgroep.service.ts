import { Injectable } from '@nestjs/common';
import { CreateSubgroepDto } from './dto/create-subgroep.dto';
import { UpdateSubgroepDto } from './dto/update-subgroep.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subgroep } from './entities/subgroep.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubgroepService {
  constructor(
    @InjectRepository(Subgroep)
    private readonly subgroepRepository: Repository<Subgroep>,
  ) {}
  create(createSubgroepDto: CreateSubgroepDto) {
    return this.subgroepRepository.save(createSubgroepDto);
  }

  findAll() {
    return this.subgroepRepository.find();
  }

  findOne(subgroepID: number) {
    return this.subgroepRepository.findOneBy({ subgroepID });
  }

  update(subgroepID: number, updateSubgroepDto: UpdateSubgroepDto) {
    return this.subgroepRepository.update(subgroepID, updateSubgroepDto);
  }

  remove(subgroepID: number) {
    return this.subgroepRepository.delete({ subgroepID });
  }
}
