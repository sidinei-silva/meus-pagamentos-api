import { DataSource } from 'typeorm';

import { postgresDataSource } from './datasources/postgresDataSource';
import { sqliteDataSource } from './datasources/sqliteDataSource';

const envoriment = process.env.NODE_ENV;

const typeOrmCreateConnection = async (): Promise<DataSource> => {
  if (envoriment !== 'test') {
    return sqliteDataSource.initialize();
  }

  return postgresDataSource.initialize();
};

const getDataSource = (): DataSource => {
  if (envoriment === 'test') {
    return sqliteDataSource;
  }

  return postgresDataSource;
};

export { typeOrmCreateConnection, getDataSource };
