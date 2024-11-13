import { Module } from '@nestjs/common';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';
import { OpleidingGebruikerController } from './opleiding-gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpleidingGebruiker } from './entities/opleiding-gebruiker.entity';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Opleiding } from '../opleiding/entities/opleiding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpleidingGebruiker, Gebruiker, Opleiding]),
  ],
  controllers: [OpleidingGebruikerController],
  providers: [OpleidingGebruikerService],
})
export class OpleidingGebruikerModule {}
