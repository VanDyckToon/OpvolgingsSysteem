import { Injectable } from '@nestjs/common';
import { CreateOpleidingGebruikerDto } from './dto/create-opleiding-gebruiker.dto';
import { UpdateOpleidingGebruikerDto } from './dto/update-opleiding-gebruiker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OpleidingGebruiker } from './entities/opleiding-gebruiker.entity';
import { Repository } from 'typeorm';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Opleiding } from '../opleiding/entities/opleiding.entity';

@Injectable()
export class OpleidingGebruikerService {
  constructor(
    @InjectRepository(OpleidingGebruiker)
    private readonly opleidingGebruikerRepository: Repository<OpleidingGebruiker>,
    @InjectRepository(Gebruiker)
    private readonly gebruikerRepository: Repository<Gebruiker>,
    @InjectRepository(Opleiding)
    private readonly opleidingRepository: Repository<Opleiding>,
  ) {}

  create(createOpleidingGebruikerDto: CreateOpleidingGebruikerDto) {
    return this.opleidingGebruikerRepository.save(createOpleidingGebruikerDto);
  }

  findAll() {
    return this.opleidingGebruikerRepository.find();
  }

  findOne(opleidingGebruikerID: number) {
    return this.opleidingGebruikerRepository.findOneBy({
      opleidingGebruikerID,
    });
  }

  update(
    opleidingGebruikerID: number,
    updateOpleidingGebruikerDto: UpdateOpleidingGebruikerDto,
  ) {
    return this.opleidingGebruikerRepository.update(
      opleidingGebruikerID,
      updateOpleidingGebruikerDto,
    );
  }

  remove(opleidingGebruikerID: number) {
    return this.opleidingGebruikerRepository.delete({ opleidingGebruikerID });
  }

  async getGebruikersByOpleiding(opleidingID: number): Promise<Gebruiker[]> {
    const opleidingGebruikers = await this.opleidingGebruikerRepository.find({
      where: { opleiding: { opleidingID } },
      relations: ['gebruiker'],
    });
    return opleidingGebruikers.map((og) => og.gebruiker);
  }

  async removeByOpleidingAndGebruiker(
    opleidingID: number,
    gebruikerID: number,
  ) {
    const opleidingGebruiker = await this.opleidingGebruikerRepository.findOne({
      where: {
        opleiding: { opleidingID },
        gebruiker: { gebruikerID },
      },
    });

    if (opleidingGebruiker) {
      // Remove the record from the database
      await this.opleidingGebruikerRepository.delete(
        opleidingGebruiker.opleidingGebruikerID,
      );
      return { message: 'User successfully removed from the course' };
    } else {
      return { message: 'User not found in the course' };
    }
  }
  async checkUserInOpleiding(
    opleidingID: number,
    gebruikerID: number,
  ): Promise<boolean> {
    const user = await this.opleidingGebruikerRepository.findOne({
      where: {
        opleiding: { opleidingID }, // Here we refer to the related Opleiding entity
        gebruiker: { gebruikerID }, // And the related Gebruiker entity
      },
    });
    return !!user; // Return true if user exists, false otherwise
  }
}
