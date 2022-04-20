import { Router } from 'express';

import { authenticationRouter } from '@modules/authentication/infra/http/routes/authentication.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/status', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/users', usersRouter);

router.use('/authentication', authenticationRouter);

export { router };
