import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import { validateDto } from '../middlewares/validatorDto.middleware';

const router = Router();

router.post('/', validateDto(CreateTaskDto), TaskController.create);
router.put('/:id', validateDto(UpdateTaskDto), TaskController.update);
router.delete('/:id', TaskController.delete);
router.get('/', TaskController.getByUser);
router.get('/:id', TaskController.getById);
router.delete('/', TaskController.deleteAll);

export default router;
