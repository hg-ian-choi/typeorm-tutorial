import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Photo } from './entity/Photo';
import { User } from './entity/User';

// Creating a new DataSource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1213',
  database: 'typeorm_tutorial',
  synchronize: true,
  logging: false,
  entities: [User, Photo],
  migrations: [],
  subscribers: [],
});
