import express, { Request, Response } from 'express';
import taskRouter from './api/routes/task.routes';
import userRouter from './api/routes/user.routes';
import { errorHandler } from './api/middlewares/errorHandler.middleware';
import verifyToken from './api/middlewares/verifyToken.middleware';
import 'reflect-metadata';

const { PORT } = process.env;

async function bootstrap() {
  const app = express();
  app.use(express.json());  
  const port = PORT || 3000;
  
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Rotas sem auth middleware
  app.use("/users", userRouter);  
  
  // Rotas com auth middleware
  app.use("/tasks", verifyToken, taskRouter);  

  app.use(errorHandler);
  
  app.listen(port, () => {
    console.log("App running on port", port);
  });
}

bootstrap();
