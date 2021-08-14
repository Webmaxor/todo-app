const { Router } = require("express");
const todoIndex = require("./todoIndex");
const { todoCreateValidators, todoCreate } = require("./todoCreate");
const { todoUpdateValidators, todoUpdate } = require("./todoUpdate");

/**
 * TODO api routes.
 * Base url: `/api/v1/todo`
 */
function todoApiRouter() {
  const api = Router();

  api.get("/index", todoIndex);
  api.post("/create", todoCreateValidators, todoCreate);
  api.put("/update/:id", todoUpdateValidators, todoUpdate);

  return api;
}

module.exports = todoApiRouter;
