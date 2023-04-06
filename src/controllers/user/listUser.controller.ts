import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listUser = async (req: Request, res: Response) => {
  try {
    const { page = '0', limit = '10', query = '' } = req.query;

    const pageNumber = parseInt(page.toString(), 10);
    const pageSize = parseInt(limit.toString(), 10);

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query.toString(),
          mode: 'insensitive',
        },
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        confirmed: true,
      },
    });

    const totalCount = await prisma.user.count({
      where: {
        name: {
          contains: query.toString(),
          mode: 'insensitive',
        },
      },
    });

    return res.status(200).send({ users, totalCount });
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
