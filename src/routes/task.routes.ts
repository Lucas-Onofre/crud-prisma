import { Router } from 'express';

import { auth } from '../middlewares/auth';

const routes = Router();

routes.get('/', auth, (req, res) => {
  res.send('Hello World!');
});

export default routes;
