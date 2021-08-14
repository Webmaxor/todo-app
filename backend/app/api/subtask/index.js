const { Router } = require("express");
const { subtaskCreateValidators, subtaskCreate } = require("./subtaskCreate");
const { subtaskUpdateValidators, subtaskUpdate } = require("./subtaskUpdate");

/**
 * TODO api routes.
 * Base url: `/api/v1/sub-task`
 */
function subtaskApiRouter() {
  const api = Router();

  api.post("/create", subtaskCreateValidators, subtaskCreate);
  api.put("/update/:id", subtaskUpdateValidators, subtaskUpdate);

  return api;
}

module.exports = subtaskApiRouter;
