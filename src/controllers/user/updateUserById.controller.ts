import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).send({ message: 'Missing id' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
