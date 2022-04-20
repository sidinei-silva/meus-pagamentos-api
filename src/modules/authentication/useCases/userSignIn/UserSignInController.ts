import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IUserSignInBodyDTO } from '@modules/authentication/dtos/IUserSignInBodyDTO';

import { UserAuthValidateUseCase } from './UserAuthValidateUseCase';

export class UserSignInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IUserSignInBodyDTO = request.body;

    const userAuthValidateUseCase = container.resolve(UserAuthValidateUseCase);

    const userAuth = await userAuthValidateUseCase.execute({ email, password });

    return response.status(200).json({ data: userAuth });
  }
}
