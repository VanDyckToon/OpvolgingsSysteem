import { Module } from '@nestjs/common';
import { GebruikerSubgroepService } from './gebruiker-subgroep.service';
import { GebruikerSubgroepController } from './gebruiker-subgroep.controller';

@Module({
  controllers: [GebruikerSubgroepController],
  providers: [GebruikerSubgroepService],
})
export class GebruikerSubgroepModule {}
