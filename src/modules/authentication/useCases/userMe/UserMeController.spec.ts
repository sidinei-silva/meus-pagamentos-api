import supertest from 'supertest';

import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';
import { sqliteDataSource } from '@shared/infra/database/typeorm/datasources/sqliteDataSource';
import { app } from '@shared/infra/http/app';

describe('Endpoint  [GET] /v1/authentication/user/me ', () => {
  beforeAll(async () => {
    await sqliteDataSource.initialize();
    await sqliteDataSource.runMigrations();
  });

  afterAll(async () => {
    await sqliteDataSource.dropDatabase();
    await sqliteDataSource.destroy();
  });

  it('should be able request authenticated user', async () => {
    const userBody: ICreateUserBodyDTO = {
      email: 'sidinei.silva02@gmail.com',
      name: 'Sidinei Silva',
      password: '123456',
    };

    await supertest(app).post('/v1/users').send(userBody);

    const {
      body: { data },
    } = await supertest(app).post('/v1/authentication/user/signin').send({
      email: userBody.email,
      password: userBody.password,
    });

    const response = await supertest(app)
      .get('/v1/authentication/user/me')
      .set('Authorization', `Bearer ${data.token}`);

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      data: {
        id: data.id,
        email: userBody.email,
        name: userBody.name,
      },
    });
  });

  it('should not be able request authenticated user', async () => {
    const response = await supertest(app).get('/v1/authentication/user/me');

    expect(response.status).toBe(401);
  });
});
