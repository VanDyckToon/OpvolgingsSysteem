import { join } from 'path';
import { Rol } from '../rol/entities/rol.entity';
import { DataSourceOptions } from 'typeorm';
import { Materiaal } from '../materiaal/entities/materiaal.entity';
import { Opleiding } from '../opleiding/entities/opleiding.entity';
import { Groep } from '../groep/entities/groep.entity';

export const ormConfig = {
  type: 'postgres',
  entities: [Rol, Materiaal, Opleiding, Groep],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: false,
} satisfies DataSourceOptions;

export default ormConfig;
