import { Router } from 'express';

import { auth } from '../middlewares/auth';

import { listUser } from '../controllers/user/listUser.controller';
import { getUserById } from '../controllers/user/getUserById.controller';
import { updateUserById } from '../controllers/user/updateUserById.controller';

const routes = Router();

routes.get('/', auth, listUser);
routes.get('/:id', auth, getUserById);
routes.put('/:id', auth, updateUserById);

export default routes;
