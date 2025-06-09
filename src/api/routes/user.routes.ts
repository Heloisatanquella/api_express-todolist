import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/user.dtos";
import { validateDto } from "../middlewares/validatorDto.middleware";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/badRequest'
 *       409:
 *         $ref: '#/components/responses/conflict'
 */
router.post("/", validateDto(CreateUserDto), UserController.create);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         $ref: '#/components/responses/badRequest'
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", validateDto(LoginUserDto), UserController.login);

// Rotas com auth middleware
router.use(verifyToken);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/badRequest'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 */
router.put("/me", validateDto(UpdateUserDto), UserController.update);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/unauthorized'
 */
router.get("/me", UserController.getById);
router.delete("/me", UserController.delete);
router.delete("/all", UserController.deleteAll);

export default router;
