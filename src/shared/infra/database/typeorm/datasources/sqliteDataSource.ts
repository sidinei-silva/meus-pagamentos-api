import { DataSource } from 'typeorm';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [`src/**/*.entity.ts`, `dist/src/**/*.entity.js`],
  dropSchema: true,
  synchronize: true,
  logging: false,
});
