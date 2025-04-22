import express, { Request, Response } from 'express';
import taskRouter from './api/routes/task.routes';
import userRouter from './api/routes/user.routes';

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

  app.use("/users", userRouter);  
  app.use("/tasks", taskRouter);  

  app.listen(port, () => {
    console.log("App running on port", port);
  });
}

bootstarp();
