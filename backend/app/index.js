const express = require("express");
const http = require("http");
const { json: jsonBodyParser } = require("body-parser");
const config = require("./config");
const todoApiRouter = require("./api/todo");

async function init() {
  const app = express();
  const server = http.createServer(app);

  app.use(
    jsonBodyParser({
      limit: config.bodyLimit,
    })
  );

  app.use("/api/v1/todo", todoApiRouter());

  server.listen(config.port, () => {
    console.log(`Started http server on port ${server.address().port}`);
  });
}

init();
