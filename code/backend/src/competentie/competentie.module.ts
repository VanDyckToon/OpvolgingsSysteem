import { Module } from '@nestjs/common';
import { CompetentieService } from './competentie.service';
import { CompetentieController } from './competentie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competentie } from './entities/competentie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competentie])],
  controllers: [CompetentieController],
  providers: [CompetentieService],
})
export class CompetentieModule {}
