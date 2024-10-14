import { Injectable } from '@nestjs/common';
import { CreateOpmerkingDto } from './dto/create-opmerking.dto';
import { UpdateOpmerkingDto } from './dto/update-opmerking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opmerking } from './entities/opmerking.entity';

@Injectable()
export class OpmerkingService {
  constructor(
    @InjectRepository(Opmerking)
    private readonly opmerkingRepository: Repository<Opmerking>,
  ) {}
  create(createOpmerkingDto: CreateOpmerkingDto) {
    return this.opmerkingRepository.save(createOpmerkingDto);
  }

  findAll() {
    return this.opmerkingRepository.find();
  }

  findOne(opmerkingID: number) {
    return this.opmerkingRepository.findOneBy({ opmerkingID });
  }

  update(opmerkingID: number, updateOpmerkingDto: UpdateOpmerkingDto) {
    return this.opmerkingRepository.update(opmerkingID, updateOpmerkingDto);
  }

  remove(opmerkingID: number) {
    return this.opmerkingRepository.delete({ opmerkingID });
  }
}
