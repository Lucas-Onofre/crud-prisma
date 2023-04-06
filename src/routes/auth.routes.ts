import { Router } from 'express';

import { signUp } from '../controllers/auth/signup.controller';
import { confirm } from '../controllers/auth/confirm.controller';
import { signIn } from '../controllers/auth/signin.controller';
import { signOut } from '../controllers/auth/signout.controller';
import { refresh } from '../controllers/auth/refresh.controller';

const routes = Router();

routes.post('/signin', signIn);
routes.post('/signup', signUp);
routes.post('/signout', signOut);
routes.get('/refresh', refresh);
routes.get('/confirm/:token', confirm);

export default routes;
