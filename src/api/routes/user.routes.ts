import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

 router.post('/', UserController.create)
 router.put('/:id', UserController.update)
 router.get('/:id', UserController.getById)

export default router;
