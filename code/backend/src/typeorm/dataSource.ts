import { DataSource } from 'typeorm';
import ormConfig from './orm.config';
import { config } from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
config({ path: envFile });

console.log(process.env.DATABASE_URL);

const dataSource = new DataSource({
  ...ormConfig,
  url: process.env.DATABASE_URL,
});

export default dataSource;
