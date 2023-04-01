import { Request, Response } from 'express';

export const signUp = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: 'SignUp route' });
};

export const signIn = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: 'SignIn route' });
};

export const refreshToken = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: 'RefreshToken route' });
};

export const signOut = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: 'SignOut route' });
};
