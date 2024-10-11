import { Injectable } from '@nestjs/common';
import { CreateTechnischeCompetentieDto } from './dto/create-technische-competentie.dto';
import { UpdateTechnischeCompetentieDto } from './dto/update-technische-competentie.dto';

@Injectable()
export class TechnischeCompetentieService {
  create(createTechnischeCompetentieDto: CreateTechnischeCompetentieDto) {
    return 'This action adds a new technischeCompetentie';
  }

  findAll() {
    return `This action returns all technischeCompetentie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technischeCompetentie`;
  }

  update(id: number, updateTechnischeCompetentieDto: UpdateTechnischeCompetentieDto) {
    return `This action updates a #${id} technischeCompetentie`;
  }

  remove(id: number) {
    return `This action removes a #${id} technischeCompetentie`;
  }
}
