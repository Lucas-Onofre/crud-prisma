import { Request } from 'express';

import { IUser } from 'src/interfaces/IUser';

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
