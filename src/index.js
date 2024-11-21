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

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find()
    return res.send(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    return res.send(task)
});

app.patch("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, {
        new: true
    })
    return res.send(task)
})

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
