import { DataSource } from 'typeorm';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: ['./src/shared/infra/database/typeorm/migrations/*.ts'],
  entities: [`src/**/*.entity.ts`, `dist/src/**/*.entity.js`],
  subscribers: [],
  synchronize: false,
  logging: false,
});

const envoriment = process.env.NODE_ENV;

// postgresDataSource.initialize();

if (envoriment !== 'test') {
  postgresDataSource.initialize();
}
