import { Module } from '@nestjs/common';
import { CompetentieGebruikerService } from './competentie-gebruiker.service';
import { CompetentieGebruikerController } from './competentie-gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetentieGebruiker } from './entities/competentie-gebruiker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompetentieGebruiker])],
  controllers: [CompetentieGebruikerController],
  providers: [CompetentieGebruikerService],
})
export class CompetentieGebruikerModule {}
