import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

import { CheckUserUseCase } from './CheckUserUseCase';

let userRepositoryInMemory: UsersRepositoryInMemory;
let checkUserUseCase: CheckUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authentication User Validate Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    checkUserUseCase = new CheckUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able user exists', async () => {
    const userBody = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    const user = await createUserUseCase.execute(userBody);

    const checkUser = await checkUserUseCase.execute({
      email: userBody.email,
      id: user.id,
    });

    expect(checkUser).toBe(true);
  });

  it('should not be able user exists', async () => {
    const checkUser = await checkUserUseCase.execute({
      email: 'sidinei.silva02@gmail.com',
      id: '',
    });

    expect(checkUser).toBe(false);
  });
});
