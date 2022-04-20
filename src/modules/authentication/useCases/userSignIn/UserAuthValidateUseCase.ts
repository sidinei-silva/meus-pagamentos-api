import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { userConstantsJWT } from '@modules/authentication/constants/userConstantsJWT';
import { IUserSignInBodyDTO } from '@modules/authentication/dtos/IUserSignInBodyDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/errors/appError';

@injectable()
export class UserAuthValidateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userAuthDto: IUserSignInBodyDTO) {
    const { email, password } = userAuthDto;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const validatePassword = await compareSync(password, user.password);

    if (!validatePassword) {
      throw new AppError('Password does not match', 401);
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      userConstantsJWT.secret,
      { expiresIn: userConstantsJWT.expiresIn },
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }
}
