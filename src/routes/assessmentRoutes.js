import { Router } from 'express';
import assessmentController from '../controllers/AssessmentController';
import login from '../middlewares/login';

const router = new Router();

router.post('/', login, assessmentController.create);
router.put('/:id', login, assessmentController.update);
router.delete('/:id', login, assessmentController.delete);

export default router;
