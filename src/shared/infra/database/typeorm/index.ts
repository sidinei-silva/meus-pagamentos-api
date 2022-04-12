import { DataSource } from 'typeorm';

import { AppError } from '@shared/infra/errors/appError';

type connectionName = 'default' | 'test';

const typeOrmCreateConnection = async (
  typeConnection: connectionName,
): Promise<DataSource> => {
  if (typeConnection === 'default') {
    const AppDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      migrations: ['./src/shared/infra/typeorm/database/migrations/*.ts'],
      entities: ['./src/modules/**/entities/*.{ts,js}'],
      subscribers: [],
      synchronize: false,
    });

    return AppDataSource.initialize();
  }

  if (typeConnection === 'test') {
    const TestDataStore = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: ['./src/modules/**/entities/*.ts'],
      dropSchema: true,
      synchronize: true,
      logging: false,
    });

    return TestDataStore.initialize();
  }

  throw new AppError('Connection name not found.', 500);
};

export { typeOrmCreateConnection };
