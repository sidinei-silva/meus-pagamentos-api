import passport from 'passport';

import { UserJWTStrategy } from './userJWTStrategy';

export const loadPassportStrategies = () => {
  passport.use('userJWT', new UserJWTStrategy());
};
