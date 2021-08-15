const express = require("express");
const http = require("http");
const { json: jsonBodyParser } = require("body-parser");
const cors = require("cors");
const config = require("./config");
const todoApiRouter = require("./api/todo");
const subtaskApiRouter = require("./api/subtask");

async function init() {
  const app = express();
  const server = http.createServer(app);

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

  server.listen(config.port, () => {
    console.log(`Started http server on port ${server.address().port}`);
  });
}

init();
