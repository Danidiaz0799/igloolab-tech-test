import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Product } from '../entities/Product';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'products_db',
  synchronize: true, // Solo para desarrollo - crea automáticamente las tablas
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
