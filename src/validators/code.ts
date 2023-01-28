const Joi = require("joi")
export const executeValidator = Joi.object({
  format: Joi.string().valid("c", "cpp", "py", "js", "java"),
  code: Joi.string(),
  input: Joi.string().optional(),
})
