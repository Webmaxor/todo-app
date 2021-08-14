const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
const { Subtask } = require("../../models");

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
