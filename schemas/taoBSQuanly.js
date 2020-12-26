const Joi = require("joi");

module.exports = Joi.object({
  MaNhanVien: Joi.number().integer().required(),
})

