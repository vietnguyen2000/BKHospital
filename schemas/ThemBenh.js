const Joi = require("joi");

module.exports = Joi.object({
  TenBenh: Joi.string().max(15).required(),
});
