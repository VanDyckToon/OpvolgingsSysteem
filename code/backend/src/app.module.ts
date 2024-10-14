import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from './typeorm/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { CompetentieModule } from './competentie/competentie.module';
import { MateriaalModule } from './materiaal/materiaal.module';
import { OpleidingModule } from './opleiding/opleiding.module';
import { GroepModule } from './groep/groep.module';
import { ScoreModule } from './score/score.module';
import { TaakModule } from './taak/taak.module';
import { TechnischeCompetentieModule } from './technische-competentie/technische-competentie.module';
import { GebruikerModule } from './gebruiker/gebruiker.module';
import { SubgroepModule } from './subgroep/subgroep.module';
import { TaakMateriaalModule } from './taak-materiaal/taak-materiaal.module';
import { OpleidingGebruikerModule } from './opleiding-gebruiker/opleiding-gebruiker.module';
import { CompetentieGebruikerModule } from './competentie-gebruiker/competentie-gebruiker.module';
import { TechnischeCompetentieGebruikerModule } from './technische-competentie-gebruiker/technische-competentie-gebruiker.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...ormConfig,
        url: configService.get('DATABASE_URL'),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    RolModule,
    CompetentieModule,
    MateriaalModule,
    OpleidingModule,
    GroepModule,
    ScoreModule,
    TaakModule,
    TechnischeCompetentieModule,
    GebruikerModule,
    SubgroepModule,
    TaakMateriaalModule,
    OpleidingGebruikerModule,
    CompetentieGebruikerModule,
    TechnischeCompetentieGebruikerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
