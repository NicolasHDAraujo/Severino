import { Router } from 'express';

import login from '../middlewares/login';

import imageController from '../controllers/ImageController';

const router = new Router();
// 'foto' é o nome do campo que será enviada a imagem
router.post('/', login, imageController.create);
router.post('/:id', login, imageController.createImgService);

export default router;
