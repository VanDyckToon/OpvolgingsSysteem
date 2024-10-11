import { join } from 'path';
import { Rol } from '../rol/entities/rol.entity';
import { DataSourceOptions } from 'typeorm';
import { Competentie } from '../competentie/entities/competentie.entity';
import { Materiaal } from '../materiaal/entities/materiaal.entity';
import { Opleiding } from '../opleiding/entities/opleiding.entity';
import { Groep } from '../groep/entities/groep.entity';
import { Score } from '../score/entities/score.entity';
import { TechnischeCompetentie } from '../technische-competentie/entities/technische-competentie.entity';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { Taak } from '../taak/entities/taak.entity';

export const ormConfig = {
  type: 'postgres',
  entities: [
    Rol,
    Materiaal,
    Opleiding,
    Groep,
    Competentie,
    Score,
    TechnischeCompetentie,
    Gebruiker,
    Taak,
  ],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: false,
} satisfies DataSourceOptions;

export default ormConfig;
