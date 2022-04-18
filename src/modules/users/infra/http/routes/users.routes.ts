import { Router } from 'express';

import { ICreateUserBodyDTO } from '@modules/users/dtos/ICreateUserBodyDTO';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { validationBodyMiddleware } from '@shared/infra/http/middlewares/requestValidationMiddleware';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post(
  '/',
  validationBodyMiddleware(ICreateUserBodyDTO),
  createUserController.handle,
);

export { usersRouter };
