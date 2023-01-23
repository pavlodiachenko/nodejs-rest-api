const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const putSchema = Joi.object({
  name: Joi.any(),
  email: Joi.any(),
  phone: Joi.any(),
}).or("name", "email", "phone");

module.exports = { postSchema, putSchema };
