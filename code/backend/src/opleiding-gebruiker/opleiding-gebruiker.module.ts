import { Module } from '@nestjs/common';
import { OpleidingGebruikerService } from './opleiding-gebruiker.service';
import { OpleidingGebruikerController } from './opleiding-gebruiker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpleidingGebruiker } from './entities/opleiding-gebruiker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpleidingGebruiker])],
  controllers: [OpleidingGebruikerController],
  providers: [OpleidingGebruikerService],
})
export class OpleidingGebruikerModule {}
