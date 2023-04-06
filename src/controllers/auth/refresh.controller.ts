import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { generateTokens } from '../../auth/generateTokens';

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ message: 'Missing refresh token' });
    }

    const user = await prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isValidRefreshToken = refreshToken === user.refreshToken;
    if (!isValidRefreshToken) {
      return res.status(400).send({ message: 'Invalid refresh token' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    return res.status(200).send({
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
      status: 'success',
    });
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
