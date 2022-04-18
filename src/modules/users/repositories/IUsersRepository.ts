import { User } from '../domain/User';
import { ICreateUserBodyDTO } from '../dtos/ICreateUserBodyDTO';

export interface IUsersRepository {
  create(data: ICreateUserBodyDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
