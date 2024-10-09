import { join } from 'path';
import { Rol } from '../rol/entities/rol.entity';
import { DataSourceOptions } from 'typeorm';

export const ormConfig = {
  type: 'postgres',
  entities: [Rol],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: false,
} satisfies DataSourceOptions;

export default ormConfig;
