import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface IPayload {
  userId: string;
}

const jwt_secret = process.env.JWT_SECRET as string;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const { userId } = verify(token, jwt_secret) as IPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    return next();
  } catch (err: any) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
