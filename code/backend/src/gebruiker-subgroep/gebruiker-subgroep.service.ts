import { Injectable } from '@nestjs/common';
import { CreateGebruikerSubgroepDto } from './dto/create-gebruiker-subgroep.dto';
import { UpdateGebruikerSubgroepDto } from './dto/update-gebruiker-subgroep.dto';
import { GebruikerSubgroep } from './entities/gebruiker-subgroep.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Subgroep } from '../subgroep/entities/subgroep.entity';

@Injectable()
export class GebruikerSubgroepService {
  constructor(
    @InjectRepository(GebruikerSubgroep)
    private readonly gebruikerSubgroepRepository: Repository<GebruikerSubgroep>,
    @InjectRepository(Gebruiker)
    private readonly gebruikerRepository: Repository<Gebruiker>,
    @InjectRepository(Subgroep)
    private readonly subgorepRepository: Repository<Subgroep>,
  ) {}

  async create(createGebruikerSubgroepDto: CreateGebruikerSubgroepDto) {
    const gebruiker = await this.gebruikerRepository.findOneBy({
      gebruikerID: createGebruikerSubgroepDto.gebruiker.gebruikerID,
    });
    const subgroep = await this.subgorepRepository.findOneBy({
      subgroepID: createGebruikerSubgroepDto.subgroep.subgroepID,
    });

    const gebruikerSubgroep = this.gebruikerSubgroepRepository.create({
      gebruiker,
      subgroep,
    });

    return this.gebruikerSubgroepRepository.save(gebruikerSubgroep);
  }

  findAll() {
    return this.gebruikerSubgroepRepository.find();
  }

  findOne(gebruikerSubgroepID: number) {
    return this.gebruikerSubgroepRepository.findOneBy({ gebruikerSubgroepID });
  }

  getGebruikersBySubgroep(subgroepID: number) {
    return this.gebruikerSubgroepRepository.find({
      where: {
        subgroep: { subgroepID },
      },
      relations: ['gebruiker', 'subgroep', 'gebruiker.rol'],
    });
  }

  update(
    gebruikerSubgroepID: number,
    updateGebruikerSubgroepDto: UpdateGebruikerSubgroepDto,
  ) {
    return this.gebruikerSubgroepRepository.update(
      gebruikerSubgroepID,
      updateGebruikerSubgroepDto,
    );
  }

  removeGebruikerFromSubgroep(gebruikerID: number, subgroepID: number) {
    return this.gebruikerSubgroepRepository.delete({
      gebruiker: { gebruikerID },
      subgroep: { subgroepID },
    });
  }

  remove(gebruikerSubgroepID: number) {
    return this.gebruikerSubgroepRepository.delete({ gebruikerSubgroepID });
  }
}
