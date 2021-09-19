import { Router } from 'express';

import userController from '../controllers/UserController';

import login from '../middlewares/login';

const router = new Router();

router.post('/', userController.create);
router.get('/', login, userController.show);
router.put('/', login, userController.update);
router.delete('/', login, userController.delete);

export default router;
