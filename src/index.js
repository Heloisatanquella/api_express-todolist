const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
mongoose.connect(
  "mongodb+srv://heloisatanquella:<db_password>@apiexpress.4qfhd.mongodb.net/?retryWrites=true&w=majority&appName=apiexpress"
);

const Task = mongoose.model("Task", { 
    title: String,
    description: String,
});

app.get("/tasks", (req, res) => {
  res.send("Hello world");
});


app.listen(port, () => {
  console.log("App running");
});
