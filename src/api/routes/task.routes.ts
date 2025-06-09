import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import { validateDto } from '../middlewares/validatorDto.middleware';
import verifyToken from '../middlewares/verifyToken.middleware';

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa para o usuário autenticado
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/badRequest'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 */
router.post('/', verifyToken, validateDto(CreateTaskDto), TaskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas do usuário autenticado
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 */
router.get('/', verifyToken, TaskController.getByUser);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskId'
 *     responses:
 *       200:
 *         description: Tarefa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 */
router.get('/:id', verifyToken, TaskController.getById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/badRequest'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 */
router.put('/:id', verifyToken, validateDto(UpdateTaskDto), TaskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa pelo ID
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskId'
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 */
router.delete('/:id', verifyToken, TaskController.delete);

router.delete('/', verifyToken, TaskController.deleteAll);

export default router;
