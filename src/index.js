const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
const port = 3000;
mongoose.connect(
  "mongodb+srv://heloisatanquella:ymH6ZYhBoNv9K67E@apiexpress.4qfhd.mongodb.net/?retryWrites=true&w=majority&appName=apiexpress"
);

const Task = mongoose.model("Task", { 
    title: String,
    description: String,
});

app.get("/tasks", (req, res) => {
  res.send("Hello world");
});

app.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    })
    await task.save()
    res.send(task)
})

app.listen(port, () => {
  console.log("App running");
});
