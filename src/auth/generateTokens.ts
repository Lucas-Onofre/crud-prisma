import jwt from 'jsonwebtoken';

import { IUser } from '../interfaces/IUser';

const jwt_secret = process.env.JWT_SECRET as string;

export const generateTokens = (user: IUser) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      confirmed: user.confirmed,
    },
    jwt_secret,
    {
      expiresIn: '60m',
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      confirmed: user.confirmed,
    },
    jwt_secret,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
};
