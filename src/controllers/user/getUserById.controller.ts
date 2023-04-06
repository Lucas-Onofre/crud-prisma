import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Missing id' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        confirmed: true,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).send(user);
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
