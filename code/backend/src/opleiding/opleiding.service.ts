import { Injectable } from '@nestjs/common';
import { CreateOpleidingDto } from './dto/create-opleiding.dto';
import { UpdateOpleidingDto } from './dto/update-opleiding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opleiding } from './entities/opleiding.entity';

@Injectable()
export class OpleidingService {
  constructor(
    @InjectRepository(Opleiding)
    private readonly opleidingRepository: Repository<Opleiding>,
  ) {}
  create(createOpleidingDto: CreateOpleidingDto) {
    return this.opleidingRepository.save(createOpleidingDto);
  }

  findAll() {
    return this.opleidingRepository.find();
  }

  findOne(opleidingID: number) {
    return this.opleidingRepository.findOneBy({ opleidingID });
  }

  update(opleidingID: number, updateOpleidingDto: UpdateOpleidingDto) {
    return this.opleidingRepository.update(opleidingID, updateOpleidingDto);
  }

  remove(opleidingID: number) {
    return this.opleidingRepository.delete({ opleidingID });
  }
}
