import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import verifyToken from '../middlewares/verifyToken.middleware';

const router = Router();

 router.post('/', UserController.create)
 router.post('/login', UserController.login)
  // Rotas com auth middleware
 router.use(verifyToken);
 router.put('/:id', UserController.update)
 router.get('/me', UserController.getById)

export default router;
