import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { container } from 'tsyringe';

import { userConstantsJWT } from '@modules/authentication/constants/userConstantsJWT';
import { CheckUserUseCase } from '@modules/authentication/useCases/userMe/CheckUserUseCase';
import { AppError } from '@shared/infra/errors/appError';

class UserJWTStrategy extends JwtStrategy {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: userConstantsJWT.secret,
        ignoreExpiration: false,
      },
      (payload, done) => this.verify(payload, done),
    );
  }

  async verify(payload: any, done: any): Promise<any> {
    const { id, email } = payload;
    const checkUserUseCase = container.resolve(CheckUserUseCase);

    const checkUser = await checkUserUseCase.execute({ email, id });

    if (!checkUser) {
      return done(new AppError('Authentication Invalid', 401), false);
    }

    return done(null, payload);
  }
}

export { UserJWTStrategy };
