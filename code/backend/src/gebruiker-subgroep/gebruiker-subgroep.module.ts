import { Module } from '@nestjs/common';
import { GebruikerSubgroepService } from './gebruiker-subgroep.service';
import { GebruikerSubgroepController } from './gebruiker-subgroep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GebruikerSubgroep } from './entities/gebruiker-subgroep.entity';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Subgroep } from '../subgroep/entities/subgroep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GebruikerSubgroep, Gebruiker, Subgroep])],
  controllers: [GebruikerSubgroepController],
  providers: [GebruikerSubgroepService],
})
export class GebruikerSubgroepModule {}
