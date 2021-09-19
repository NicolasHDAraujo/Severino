import { Router } from 'express';

import scheduleController from '../controllers/ScheduleController';

import login from '../middlewares/login';

const router = new Router();

router.post('/', login, scheduleController.create);
router.put('/:id', login, scheduleController.update);
router.delete('/:id', login, scheduleController.delete);

export default router;
