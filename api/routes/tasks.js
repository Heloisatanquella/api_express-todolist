const express = require('express');

const verifyToken = require('../middlewares/verify.token');
const { PrismaClient } = require('@prisma/client');

const taskRouter = express.Router()
const prisma = new PrismaClient()

// define o middleware tornando o token obrigatorio para as seguintes rotas
taskRouter.use(verifyToken);

//rota para buscar as tarefas no banco
taskRouter.get("/", async (req, res) => {
    const userId = req.userId

    const tasks = await prisma.task.findMany({ where: { userId } });
    return res.send(tasks);
});

//rota para buscar uma tarefa pelo id no banco
taskRouter.get("/:id", async (req, res) => {
    const userId = req.userId
    const { id } = req.params;

    const task = await prisma.task.findFirst({ where: { userId, id: Number(id) } });
    if(!task){
        return res.status(404).send("Tarefa não encontrada!")
    }

    return res.send(task);
});

//rota para excluir tarefa no banco pelo id
taskRouter.delete("/:id", async (req, res) => {
    const userId = req.userId
    const { id } = req.params;

    const task = await prisma.task.delete({ where: { userId, id: Number(id) } });
    if(!task){
        return res.status(404).send("Tarefa não encontrada!")
    }

    return res.send("Tarefa excluida com sucesso");
});

//rota para atualizar tarefa no banco pelo id

taskRouter.put("/:id", async (req, res) => {
    const userId = req.userId
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await prisma.task.update({ where: { userId, id: Number(id) }, data: { title, description } });
    if(!task){
        return res.status(404).send("Tarefa não encontrada!")
    }

    return res.send({ message: "Tarefa atualizada com sucesso!", task });
});

//rota para criar tarefa no banco 
taskRouter.post("/", async (req, res) => {
    const userId = req.userId
    const { title, description } = req.body;

    const task = await prisma.task.create({ data: { title, description, userId } });
    return res.send({ message: "Tarefa criada com sucesso!", task })
})

module.exports = taskRouter