//config a index route file

import { Router } from 'express';

import taskRoutes from './task.routes';

const routes = Router();

routes.use('/task', taskRoutes);

export default routes;
