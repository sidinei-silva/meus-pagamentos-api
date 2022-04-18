import { Repository } from 'typeorm';

import { User } from '@modules/users/domain/User';
import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';
import { UserEntity } from '@modules/users/infra/entities/User.entity';
import { getDataSource } from '@shared/infra/database/typeorm';

import { IUsersRepository } from '../../IUsersRepository';

export class UsersRepositoryTypeorm implements IUsersRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getDataSource().getRepository(UserEntity);
  }

  async create({
    email,
    name,
    password,
    id,
  }: ICreateUserBodyDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      id,
    });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
