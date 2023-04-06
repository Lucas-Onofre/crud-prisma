import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { generateTokens } from '../../auth/generateTokens';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    return res.status(200).send({
      data: {
        accessToken,
        refreshToken,
      },
      status: 'success',
    });
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};

const validatePassword = async (password: string, userPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(password, userPassword);

  if (!isPasswordCorrect) {
    return false;
  }

  return true;
};
