import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { PrismaClient } from '@prisma/client';

import { Request, Response } from 'express';

// import { BaseError } from '../../shared/errors';
import { sendConfirmationEmail } from '../../services/auth/emailService';

const prisma = new PrismaClient();

type IUserSignUp = {
  email: string;
  name: string;
  password: string;
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, name, password }: IUserSignUp = req.body;

    await validateUser(email);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = v4();
    const user = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        password: hashedPassword,
      },
    });

    const confirmationToken = v4();
    await prisma.confirmationToken.create({
      data: {
        id: v4(),
        token: confirmationToken,
        userId,
      },
    });

    sendConfirmationEmail({
      email,
      name,
      token: confirmationToken,
    });

    return res.status(201).json({
      data: {
        name: user.name,
        email: user.email,
      },
      status: 'success',
      message:
        'User created successfully. Please check your e-mail to verify account.',
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message, key: err.key });
  }
};

const validateUser = async (email: string) => {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('This e-mail is already in use.');
    // throw new BaseError({
    //   message: 'This e-mail is already in use.',
    //   code: 400,
    //   action: '',
    //   key: 'user',
    // });
  }
};
