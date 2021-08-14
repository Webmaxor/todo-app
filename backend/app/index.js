const express = require("express");
const http = require("http");
const { json: jsonBodyParser } = require("body-parser");
const config = require("./config");

async function init() {
  const app = express();
  const server = http.createServer(app);

  app.use(
    jsonBodyParser({
      limit: config.bodyLimit,
    })
  );

  server.listen(config.port, () => {
    console.log(`Started http server on port ${server.address().port}`);
  });
}

init();
