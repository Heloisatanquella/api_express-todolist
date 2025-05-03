import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import { validateDto } from '../middlewares/validatorDto.middleware';
import verifyToken from '../middlewares/verifyToken.middleware';

const router = Router();

router.post('/', verifyToken, validateDto(CreateTaskDto), TaskController.create);
router.put('/:id', verifyToken, validateDto(UpdateTaskDto), TaskController.update);
router.delete('/:id', verifyToken, TaskController.delete);
router.get('/', verifyToken, TaskController.getByUser);
router.get('/:id', verifyToken, TaskController.getById);
router.delete('/', verifyToken, TaskController.deleteAll);

export default router;
