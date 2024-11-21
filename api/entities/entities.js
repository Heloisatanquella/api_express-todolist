//Inicialização do db
const mongoose = require("mongoose");

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

module.exports = {Task, User}