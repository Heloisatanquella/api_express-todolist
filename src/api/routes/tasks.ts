import { Router, Request, Response } from "express";
import verifyToken from "../middlewares/verify.token";
import prisma from "../../libs/prisma";

const taskRouter = Router();

// define o middleware tornando o token obrigatorio para as seguintes rotas
taskRouter.use(verifyToken);

//rota para buscar as tarefas no banco
taskRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.send(tasks);
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para buscar uma tarefa pelo id no banco
taskRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { userId, id: Number(id) },
    });
    if (!task) {
      res.status(404).send("Tarefa não encontrada!");
    } else {
      res.send(task);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para excluir tarefa no banco pelo id
taskRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      res.status(404).send("Tarefa não encontrada!");
    } else {
      await prisma.task.delete({
        where: { userId, id: Number(id) },
      });
      res.send("Tarefa excluida com sucesso");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para atualizar tarefa no banco pelo id

taskRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await prisma.task.update({
      where: { userId, id: Number(id) },
      data: { title, description },
    });
    if (!task) {
      res.status(404).send("Tarefa não encontrada!");
    } else {
      res.send({ message: "Tarefa atualizada com sucesso!", task });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para criar tarefa no banco
taskRouter.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).send("Title e description são obrigatórios.");
    } else {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          user: { connect: { id: userId } },
        },
      });
      res.send({ message: "Tarefa criada com sucesso!", task });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Erro interno do servidor");
  }
});

export default taskRouter;
