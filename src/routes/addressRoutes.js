import { Router } from 'express';
import addressController from '../controllers/AddressController';
import login from '../middlewares/login';

const router = new Router();

router.post('/', addressController.create);
router.get('/', addressController.show);
router.put('/:id', login, addressController.update);
router.delete('/:id', login, addressController.delete);

export default router;
