const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
const { Todo, Subtask } = require("../../models");

const paramsSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const querySchema = Joi.object({
  status: Joi.string().valid("pending", "completed").required(),
});

/**
 * API endpoint function.
 * PUT api/v1/todo/update/:id
 *
 * @param {import('../types').WebApiRequest} req
 * @param {import('express').Response} res
 */
module.exports.todoUpdate = async ({ body, params }, res) => {
  const { status } = body;
  const { id } = params;
  const task = await Todo.findOne({ where: { id }, include: Subtask });

  if (!task) {
    res.status(400).send("Task not found.");
    return;
  }

  try {
    await task.update({
      status,
      updatedAt: new Date(),
    });

    const subTaskIds = task.Subtasks.map((item) => item.id);
    if (subTaskIds.length > 0) {
      Subtask.update(
        { status, updatedAt: new Date() },
        { where: { id: subTaskIds } }
      );
    }
  } catch (error) {
    console.log(error);
    return;
  }

  res.json({
    success: true,
  });
};

/**
 * Array of middleware to validate the route.
 */
module.exports.todoUpdateValidators = [
  validator.params(paramsSchema),
  validator.body(querySchema),
];
