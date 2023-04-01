import { Router } from 'express';

import { signUp } from '../controllers/auth/signup.controller';
import { confirm } from '../controllers/auth/confirm.controller';

const routes = Router();

routes.post('/signup', signUp);
routes.get('/confirm/:token', confirm);

export default routes;
