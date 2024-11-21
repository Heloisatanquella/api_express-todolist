//Inicialização das libs
const express = require("express");
const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");

//Inicialização do projeto e database
const app = express();
app.use(express.json())
const port = 3000;
mongoose.connect(
  "mongodb+srv://heloisatanquella:ymH6ZYhBoNv9K67E@apiexpress.4qfhd.mongodb.net/?retryWrites=true&w=majority&appName=apiexpress"
);
const saltRounds = 10;

//tabela para armazenar as tarefas
const Task = mongoose.model("Task", { 
    title: String,
    description: String,
});

//tabela para armazenar os usuários
const User = mongoose.model("User", { 
    username: String,
    email: String,
    password: String
});

//rota para buscar as tarefas no banco
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find()
    return res.send(tasks);
});

//

//rota para buscar uma tarefa pelo id no banco
app.get("/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id)
    return res.send(task)
})

//rota para excluir tarefa no banco pelo id
app.delete("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    return res.send(task)
});

//rota para atualizar tarefa no banco pelo id
app.patch("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, {
        new: true
    })
    return res.send(task)
})

//rota para criar o usuário
app.post("/users", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds) //hash de senha

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()
    return res.send(user)
})

//rota para criar tarefa no banco 
app.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    })
    await task.save()
    return res.send(task)
})

app.listen(port, () => {
    console.log("App running");
});
