import { Module } from '@nestjs/common';
import { TechnischeCompetentieService } from './technische-competentie.service';
import { TechnischeCompetentieController } from './technische-competentie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnischeCompetentie } from './entities/technische-competentie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnischeCompetentie])],
  controllers: [TechnischeCompetentieController],
  providers: [TechnischeCompetentieService],
})
export class TechnischeCompetentieModule {}
