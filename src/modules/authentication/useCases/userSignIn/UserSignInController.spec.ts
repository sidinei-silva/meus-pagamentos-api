import request from 'supertest';

import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';
import { sqliteDataSource } from '@shared/infra/database/typeorm/datasources/sqliteDataSource';
import { app } from '@shared/infra/http/app';

describe('User SignIn', () => {
  beforeAll(async () => {
    await sqliteDataSource.initialize();
    await sqliteDataSource.runMigrations();
  });

  afterAll(async () => {
    await sqliteDataSource.dropDatabase();
    await sqliteDataSource.destroy();
  });

  it('should be able to sign in', async () => {
    const userBody: ICreateUserBodyDTO = {
      email: 'sidinei.silva02@gmail.com',
      name: 'Sidinei Silva',
      password: '123456',
    };

    await request(app).post('/v1/users').send(userBody);

    const response = await request(app)
      .post('/v1/authentication/user/signin')
      .send({
        email: userBody.email,
        password: userBody.password,
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      data: {
        email: userBody.email,
        name: userBody.name,
      },
    });

    expect(response.body.data.token).toBeDefined();
  });
});
