const Joi = require("joi")
exports.executeValidator = Joi.object({
  format: Joi.string().valid("c", "cpp", "py", "js", "java"),
  code: Joi.string(),
})
