const Joi = require("joi");

module.exports = Joi.object({
  TenThuoc: Joi.string().min(1).max(255).required(),
});







