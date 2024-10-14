import { Module } from '@nestjs/common';
import { TechnischeCompetentieGebruikerService } from './technische-competentie-gebruiker.service';
import { TechnischeCompetentieGebruikerController } from './technische-competentie-gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnischeCompetentieGebruiker } from './entities/technische-competentie-gebruiker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnischeCompetentieGebruiker])],
  controllers: [TechnischeCompetentieGebruikerController],
  providers: [TechnischeCompetentieGebruikerService],
})
export class TechnischeCompetentieGebruikerModule {}
