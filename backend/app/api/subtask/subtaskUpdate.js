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
 * PUT api/v1/sub-task/update
 *
 * @param {import('../types').WebApiRequest} req
 * @param {import('express').Response} res
 */
module.exports.subtaskUpdate = async ({ body, params }, res) => {
  const { status } = body;
  const { id } = params;
  const subtask = await Subtask.findOne({ where: { id } });

  if (!subtask) {
    res.status(400).json({
      err: {
        message: "Subtask not found.",
      },
    });
    return;
  }

  try {
    await subtask.update({
      status,
      updatedAt: new Date(),
    });

    const task = await Todo.findOne({
      where: { id: subtask.todoId },
      include: Subtask,
    });

    if (task) {
      const completedSubTasksCount = task.Subtasks.reduce(
        (acc, item) => (item.status === "completed" ? 1 : 0) + acc,
        0
      );

      if (
        task.Subtasks.length === completedSubTasksCount &&
        task.status === "pending"
      ) {
        await task.update({
          status: "completed",
          updatedAt: new Date(),
        });
      } else if (
        task.Subtasks.length !== completedSubTasksCount &&
        task.status === "completed"
      ) {
        await task.update({
          status: "pending",
          updatedAt: new Date(),
        });
      }
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
module.exports.subtaskUpdateValidators = [
  validator.params(paramsSchema),
  validator.body(querySchema),
];
