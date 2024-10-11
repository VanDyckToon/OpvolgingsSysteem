import { Module } from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { GebruikerController } from './gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gebruiker } from './entities/gebruiker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gebruiker])],
  controllers: [GebruikerController],
  providers: [GebruikerService],
})
export class GebruikerModule {}
