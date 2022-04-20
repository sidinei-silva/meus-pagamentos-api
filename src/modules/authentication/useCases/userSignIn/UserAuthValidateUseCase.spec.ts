import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { AppError } from '@shared/infra/errors/appError';

import { UserAuthValidateUseCase } from './UserAuthValidateUseCase';

let userRepositoryInMemory: UsersRepositoryInMemory;
let userAuthValidateUseCase: UserAuthValidateUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authentication User Validate Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    userAuthValidateUseCase = new UserAuthValidateUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const userBody = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    await createUserUseCase.execute(userBody);

    const userAuth = await userAuthValidateUseCase.execute({
      email: userBody.email,
      password: userBody.password,
    });

    expect(userAuth).toBeDefined();
    expect(userAuth).toHaveProperty('token');
  });

  it('should not be able to authenticate a user with email not exists', async () => {
    const userBody = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    await expect(
      userAuthValidateUseCase.execute({
        email: userBody.email,
        password: userBody.password,
      }),
    ).rejects.toEqual(new AppError('User not found', 404));
  });
});
