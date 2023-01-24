const Joi = require("joi");
const name = Joi.string();
const email = Joi.string().email();
const phone = Joi.string()
  .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/)
  .length(14);
const postSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
});

const putSchema = Joi.object({
  name: name,
  email: email,
  phone: phone,
}).or("name", "email", "phone");

module.exports = { postSchema, putSchema };
