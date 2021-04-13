const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Todo = require("./models/todo");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

let ponger = 0;
app.get("/ping", function (req, res) {
  ponger++;
  const message = ponger % 2 !== 0 ? "ping" : "pong";
  return res.send({ message, pongerTimes: ponger });
});

app.get("/", function (req, res) {
  return res.send({ message: "the express api running" });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/todo", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    complete: req.body.complete,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/todo/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

app.delete("/todo/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: "todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/todo/:id", getTodo, async (req, res) => {
  if (req.body.text !== null) {
    res.todo.text = req.body.text;
  }
  if (req.body.complete !== null) {
    res.todo.complete = req.body.complete;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getTodo(req, res, next) {
  try {
    var myTodo = await Todo.findById(req.params.id);
    if (myTodo === null) {
      return res.status(404).json({ message: "cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = myTodo;
  next();
}
app.listen(process.env.PORT || 8080);
