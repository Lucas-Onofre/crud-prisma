//config a index route file

import { Router } from 'express';

import authRoutes from './auth.routes';

import taskRoutes from './task.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/task', taskRoutes);

export default routes;
