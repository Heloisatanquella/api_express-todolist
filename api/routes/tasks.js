const express = require('express');
const mongoose = require("mongoose");

const { Task } = require("../entities/entities"); // Importando as entities

const taskRouter = express.Router()

//rota para buscar as tarefas no banco
taskRouter.get("/", async (req, res) => {
    const tasks = await Task.find()
    return res.send(tasks);
});

//rota para buscar uma tarefa pelo id no banco
taskRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido");
    }
    try {
        // Tenta encontrar a tarefa pelo ID
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send("Tarefa não encontrada");
        }
        return res.send(task);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
});

//rota para excluir tarefa no banco pelo id
taskRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    // Valida se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido");
    }

    try {
        // Tenta encontrar e deletar a tarefa pelo ID
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send("Tarefa não encontrada");
        }
        return res.send({ message: "Tarefa deletada com sucesso", task });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
});

//rota para atualizar tarefa no banco pelo id

taskRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Valida se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido");
    }

    // Verifica se há campos a serem atualizados
    if (!title && !description) {
        return res.status(400).send("Nenhum campo fornecido para atualização");
    }

    try {
        // Tenta encontrar e atualizar a tarefa
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true } 
        );

        if (!task) {
            return res.status(404).send("Tarefa não encontrada");
        }

        return res.send({ message: "Tarefa atualizada com sucesso", task });
    } catch (error) {
        return res.status(500).send("Erro interno do servidor");
    }
});

//rota para criar tarefa no banco 
taskRouter.post("/", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    })
    await task.save()
    return res.send({ message: "Tarefa criada com sucesso!", task })
})

module.exports = taskRouter