import { Module } from '@nestjs/common';
import { TechnischeCompetentieService } from './technische-competentie.service';
import { TechnischeCompetentieController } from './technische-competentie.controller';

@Module({
  controllers: [TechnischeCompetentieController],
  providers: [TechnischeCompetentieService],
})
export class TechnischeCompetentieModule {}
