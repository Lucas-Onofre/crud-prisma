import { Router } from 'express';

import { TaskController } from '../controllers/TaskController';

const routes = Router();

routes.get('/', TaskController.index);

export default routes;
