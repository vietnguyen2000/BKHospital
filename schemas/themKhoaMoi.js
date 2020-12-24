const Joi = require("joi");

module.exports = Joi.object({
  TenKhoa: Joi.string().max(30).required(),
})

