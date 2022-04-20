import { Router } from 'express';

import { IUserSignInBodyDTO } from '@modules/authentication/dtos/IUserSignInBodyDTO';
import { validationBodyMiddleware } from '@shared/infra/http/middlewares/requestValidationMiddleware';

const authenticationRouter = Router();

const userSignInController = new UserSignInController();
authenticationRouter.post(
  '/user/signin',
  validationBodyMiddleware(IUserSignInBodyDTO),
  userSignInController.handle,
);


export { authenticationRouter };
