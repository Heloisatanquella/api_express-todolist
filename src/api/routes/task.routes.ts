import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();

 router.post('/', TaskController.create)
 router.put('/:id', TaskController.update)
 router.delete('/:id', TaskController.delete)
 router.get('/', TaskController.getByUser)
 router.get('/:id', TaskController.getById)

export default router;
