import { Request, Response } from 'express';

export const TaskController = {
  index: (req: Request, res: Response) => {
    return res.status(200).json({ success: true, message: 'Hello World!' });
  },
};
