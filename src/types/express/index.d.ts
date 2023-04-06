import { Request } from 'express';

export {};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  confirmed: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
