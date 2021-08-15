const http = require("http");
const app = require("./index");
const config = require("./config");

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Started http server on port ${server.address().port}`);
});

module.exports = app;
