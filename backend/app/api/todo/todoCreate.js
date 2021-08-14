const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
const { Todo } = require("../../models");

const querySchema = Joi.object({
  title: Joi.string().required().max(255).min(2),
});

/**
 * API endpoint function.
 * POST api/v1/todo/create
 *
 * @param {import('../types').WebApiRequest} req
 * @param {import('express').Response} res
 */
module.exports.todoCreate = async ({ body }, res) => {
  const { title } = body;
  const todo = await Todo.create({
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.json(todo);
};

/**
 * Array of middleware to validate the route.
 */
module.exports.todoCreateValidators = [validator.body(querySchema)];
