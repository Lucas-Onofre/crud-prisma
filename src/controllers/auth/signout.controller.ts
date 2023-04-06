import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type IUserSignout = {
  userId: string;
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { userId }: IUserSignout = req.body;

    if (!userId) {
      return res.status(400).send({ message: 'Invalid user' });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });

    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
