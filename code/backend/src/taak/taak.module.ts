import { Module } from '@nestjs/common';
import { TaakService } from './taak.service';
import { TaakController } from './taak.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taak } from './entities/taak.entity';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taak, Gebruiker])],
  controllers: [TaakController],
  providers: [TaakService],
})
export class TaakModule {}
