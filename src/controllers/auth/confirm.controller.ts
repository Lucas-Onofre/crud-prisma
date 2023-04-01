import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const confirm = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const confirmationToken = await prisma.confirmationToken.findFirst({
      where: {
        token,
      },
    });

    if (!confirmationToken) {
      return res.status(400).send({ message: 'Invalid token' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: confirmationToken.userId,
      },
    });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        confirmed: true,
      },
    });

    await prisma.confirmationToken.delete({
      where: {
        id: confirmationToken.id,
      },
    });

    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
};
