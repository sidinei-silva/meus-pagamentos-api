const envoriment = process.env.NODE_ENV;

const userJWTSecretKey =
  envoriment === 'test' ? 'test' : process.env.USER_JWT_SECRET_KEY;

export const userConstantsJWT = {
  secret: userJWTSecretKey,
  expiresIn: '1d',
};
