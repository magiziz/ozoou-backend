// Dependencies
const express = require("express");
const app = express();
const postgress = require("./helpers");
const routerTodo = require("./routes/todo");
const routerTodoChildren = require("./routes/todo_children");
const bodyParser = require("body-parser");
const cors = require("cors");

// Body parser and Cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(cors());

// postgress connect
postgress.connect();

app.use("/oozou/todo", routerTodo);
app.use("/oozou/todoChildren", routerTodoChildren);

app.listen(3001, () => console.log("Connected to PORT 5000"));
