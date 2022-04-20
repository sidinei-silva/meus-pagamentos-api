import { inject, injectable } from 'tsyringe';

import { ICheckUserDTO } from '@modules/authentication/dtos/ICheckUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
export class CheckUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(checkUserDto: ICheckUserDTO) {
    const user = await this.usersRepository.findByEmail(checkUserDto.email);

    if (!user || user.id !== checkUserDto.id) {
      return false;
    }

    return true;
  }
}
