import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { PrismaClient } from '@prisma/client';

import { Request, Response } from 'express';

import { BaseError } from '../../shared/errors';
import { sendConfirmationEmail } from '../../services/auth/emailService';

const prisma = new PrismaClient();

type IUserSignUp = {
  email: string;
  name: string;
  password: string;
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const r = await sendConfirmationEmail({
      email: 'lucasxxonofre@gmail.com',
      name: 'Lucas',
      token: 'rdlsaopdkaspoda',
    });

    return res.json({ r });

    // const { email, name, password }: IUserSignUp = req.body;
    // await validateUser(email);
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // const userId = v4();
    // const user = await prisma.user.create({
    //   data: {
    //     id: userId,
    //     name,
    //     email,
    //     password: hashedPassword,
    //   },
    // });
  } catch (error: BaseError | any) {
    return res
      .status(error.code)
      .json({ message: error.message, key: error.key });
  }
};

const validateUser = async (email: string) => {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new BaseError({
      message: 'This e-mail is already in use.',
      code: 400,
      action: '',
      key: 'user',
    });
  }
};
