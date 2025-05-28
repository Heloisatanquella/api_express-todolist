import express, { Request, Response } from 'express';
import taskRouter from './api/routes/task.routes';
import userRouter from './api/routes/user.routes';
import { errorHandler } from './api/middlewares/errorHandler.middleware';
import verifyToken from './api/middlewares/verifyToken.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './api/swagger'; 
import 'reflect-metadata';

const { PORT } = process.env;

async function bootstrap() {
  const app = express();

  app.use(express.json());  
  const port = PORT || 3000;

  // Endpoint da documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Endpoint de teste
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Rotas sem auth middleware
  app.use('/users', userRouter);

  // Rotas com auth middleware
  app.use('/tasks', verifyToken, taskRouter);

  
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
  });
}

bootstrap();