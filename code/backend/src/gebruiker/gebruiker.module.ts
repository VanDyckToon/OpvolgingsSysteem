import { Module } from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { GebruikerController } from './gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gebruiker } from './entities/gebruiker.entity';
import { Subgroep } from '../subgroep/entities/subgroep.entity';
import { GebruikerSubgroep } from '../gebruiker-subgroep/entities/gebruiker-subgroep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gebruiker, Subgroep, GebruikerSubgroep])],
  controllers: [GebruikerController],
  providers: [GebruikerService],
  exports: [GebruikerService],
})
export class GebruikerModule {}
