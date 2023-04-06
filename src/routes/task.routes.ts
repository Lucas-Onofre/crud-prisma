import { Router } from 'express';

import { auth } from '../middlewares/auth';

import { listUser } from '../controllers/user/listUser.controller';

const routes = Router();

routes.get('/', auth, listUser);

export default routes;
