import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const userAuthenticationJwt = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'userJWT',
      { session: false },
      (err: any, user: any) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(401).json({
            status: 401,
            message: 'Unauthorized',
          });
        }

        req.user = user;
        return next();
      },
    )(req, res, next);
  };
};
