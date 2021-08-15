const express = require("express");
const { json: jsonBodyParser } = require("body-parser");
const cors = require("cors");
const config = require("./config");
const todoApiRouter = require("./api/todo");
const subtaskApiRouter = require("./api/subtask");

const app = express();

app.use(
  cors({
    origin: config.corsWhitelist.map((regex) => new RegExp(regex)),
  })
);

app.use(
  jsonBodyParser({
    limit: config.bodyLimit,
  })
);

app.use("/api/v1/todo", todoApiRouter());
app.use("/api/v1/sub-task", subtaskApiRouter());

module.exports = app;
