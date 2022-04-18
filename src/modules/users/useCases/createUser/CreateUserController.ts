import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: ICreateUserBodyDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
    });

    return response.status(201).json({ data: user });
  }
}
