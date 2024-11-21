//Inicialização das libs
const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("../api/routes/tasks");
const userRouter = require("../api/routes/users");

//Inicialização do projeto e do database
const app = express();
app.use(express.json())
const port = 3000;
mongoose.connect(
  "mongodb+srv://heloisatanquella:ymH6ZYhBoNv9K67E@apiexpress.4qfhd.mongodb.net/?retryWrites=true&w=majority&appName=apiexpress"
);

//chamando as rotas
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

//escutando na porta 3000
app.listen(port, () => {
    console.log("App running");
});

/*TODO: 
    - Fazer token;
*/
