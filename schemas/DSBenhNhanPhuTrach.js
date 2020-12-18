const Joi = require("joi");

module.exports = Joi.object({
  Ngay:  Joi.date().iso().required(),
});


