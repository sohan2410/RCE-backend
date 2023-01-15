const Joi = require("joi")
exports.executeValidator = Joi.object({
  format: Joi.string().valid("c", "cpp", "python", "js"),
  code: Joi.string(),
})
