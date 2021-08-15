const { Todo, Subtask } = require("../../models");

/**
 * API endpoint function.
 * GET api/v1/todo/index
 *
 * @param {import('../types').WebApiRequest} req
 * @param {import('express').Response} res
 */
async function todoIndex(req, res) {
  const tasks = await Todo.findAll({
    include: Subtask,
    order: [
      ["createdAt", "DESC"],
      [Subtask, "createdAt", "ASC"],
    ],
  });
  res.json({
    results: tasks,
    total: tasks.length,
  });
}

module.exports = todoIndex;
