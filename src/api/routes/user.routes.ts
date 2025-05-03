import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import verifyToken from '../middlewares/verifyToken.middleware';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { validateDto } from '../middlewares/validatorDto.middleware';

const router = Router();

router.post('/', validateDto(CreateUserDto), UserController.create);
router.post('/login', validateDto(LoginUserDto), UserController.login);

// Rotas com auth middleware
router.use(verifyToken);
router.put('/me', validateDto(UpdateUserDto), UserController.update);
router.get('/me', UserController.getById);
router.delete('/me', UserController.delete);
router.delete('/all', UserController.deleteAll);

export default router;
