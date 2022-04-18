import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/errors/appError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, name, password }: ICreateUserBodyDTO) {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('User already exists', 400);
    }

    const passwordHashed = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });
  }
}

export { CreateUserUseCase };
