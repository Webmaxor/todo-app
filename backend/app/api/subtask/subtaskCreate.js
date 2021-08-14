const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
const { Todo, Subtask } = require("../../models");

const querySchema = Joi.object({
  title: Joi.string().required().max(255).min(2),
  todo_id: Joi.number().integer().positive().required(),
});

/**
 * API endpoint function.
 * POST api/v1/sub-task/create
 *
 * @param {import('../types').WebApiRequest} req
 * @param {import('express').Response} res
 */
module.exports.subtaskCreate = async ({ body }, res) => {
  const { title, todo_id: todoId } = body;

  const task = await Todo.findOne({ where: { id: todoId } });

  if (!task) {
    res.status(400).json({
      err: {
        message: "Task not found.",
      },
    });
    return;
  }

  const subtask = await Subtask.create({
    title,
    todoId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.json(subtask);
};

/**
 * Array of middleware to validate the route.
 */
module.exports.subtaskCreateValidators = [validator.body(querySchema)];
