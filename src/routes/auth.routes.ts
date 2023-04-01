import { Router } from 'express';

import { signUp } from '../controllers/auth/signup.controller';

const routes = Router();

routes.post('/signup', signUp);

export default routes;
