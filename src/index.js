//Inicialização das libs
const express = require("express");

const taskRouter = require("./api/routes/tasks");
const userRouter = require("./api/routes/users");

// Inicialização do projeto
async function bootstarp() {
  const app = express();
  app.use(express.json());
  const port = 3000;

  // Definindo as rotas
  app.use("/users", userRouter);
  app.use("/tasks", taskRouter);

  // Escutando na porta 3000
  app.listen(port, () => {
    console.log("App running");
  });
}

bootstarp();
