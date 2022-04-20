import { Router } from 'express';

import { IUserSignInBodyDTO } from '@modules/authentication/dtos/IUserSignInBodyDTO';
import { UserMeController } from '@modules/authentication/useCases/userMe/UserMeController';
import { UserSignInController } from '@modules/authentication/useCases/userSignIn/UserSignInController';
import { validationBodyMiddleware } from '@shared/infra/http/middlewares/requestValidationMiddleware';

import { userAuthenticationJwt } from '../middlewares/userAuthenticationJwtMiddleware';

const authenticationRouter = Router();

const userSignInController = new UserSignInController();
const userMeController = new UserMeController();

authenticationRouter.post(
  '/user/signin',
  validationBodyMiddleware(IUserSignInBodyDTO),
  userSignInController.handle,
);

authenticationRouter.get(
  '/user/me',
  userAuthenticationJwt(),
  userMeController.handle,
);

export { authenticationRouter };
