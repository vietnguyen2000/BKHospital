const Joi = require("joi");

module.exports = Joi.object({
  MaBenh: Joi.number().integer().required(),
})

