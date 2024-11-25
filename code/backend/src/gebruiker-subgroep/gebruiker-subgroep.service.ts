import { Injectable } from '@nestjs/common';
import { CreateGebruikerSubgroepDto } from './dto/create-gebruiker-subgroep.dto';
import { UpdateGebruikerSubgroepDto } from './dto/update-gebruiker-subgroep.dto';

@Injectable()
export class GebruikerSubgroepService {
  create(createGebruikerSubgroepDto: CreateGebruikerSubgroepDto) {
    return 'This action adds a new gebruikerSubgroep';
  }

  findAll() {
    return `This action returns all gebruikerSubgroep`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gebruikerSubgroep`;
  }

  update(id: number, updateGebruikerSubgroepDto: UpdateGebruikerSubgroepDto) {
    return `This action updates a #${id} gebruikerSubgroep`;
  }

  remove(id: number) {
    return `This action removes a #${id} gebruikerSubgroep`;
  }
}
