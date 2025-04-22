import express, { Request, Response } from 'express';
import userRouter from './api/routes/users';
import taskRouter from './api/routes/tasks';

// Inicialização do projeto
async function bootstarp() {
  const app = express();
  app.use(express.json());
  const port = 3000;
  
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  
  // Definindo as rotas
  app.use("/users", userRouter);
  app.use("/tasks", taskRouter);

  // Escutando na porta 3000
  app.listen(port, () => {
    console.log("App running");
  });
}

bootstarp();
