import { Router } from 'express';

import serviceController from '../controllers/ServiceController';

import login from '../middlewares/login';

const router = new Router();

router.post('/', login, serviceController.create);
router.get('/', serviceController.index);
router.get('/:id', serviceController.show);
router.get('/', serviceController.search);
router.put('/:id', login, serviceController.update);
router.delete('/:id', login, serviceController.delete);

export default router;
