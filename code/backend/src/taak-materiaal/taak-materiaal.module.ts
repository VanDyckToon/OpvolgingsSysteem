import { Module } from '@nestjs/common';
import { TaakMateriaalService } from './taak-materiaal.service';
import { TaakMateriaalController } from './taak-materiaal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaakMateriaal } from './entities/taak-materiaal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaakMateriaal])],
  controllers: [TaakMateriaalController],
  providers: [TaakMateriaalService],
})
export class TaakMateriaalModule {}
