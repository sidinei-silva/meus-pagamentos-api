import request from 'supertest';

import { sqliteDataSource } from '@shared/infra/database/typeorm/datasources/sqliteDataSource';
import { app } from '@shared/infra/http/app';

describe('Create User Controller', () => {
  beforeAll(async () => {
    await sqliteDataSource.initialize();
    // await sqliteDataSource.initialize();
    // await sqliteDataSource.runMigrations();
  });

  afterAll(async () => {
    // await postgresDataSource.dropDatabase();
    // await postgresDataSource.destroy();
  });

  it('should be able to create a new user', async () => {
    const userBody = {
      email: 'sidinei.silva02@gmail.com',
      name: 'Sidinei Silva',
      password: '123456',
    };

    const response = await request(app).post('/v1/users').send(userBody);

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      data: {
        email: userBody.email,
        name: userBody.name,
      },
    });
  });
});
