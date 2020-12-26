const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  FromDate:  Joi.date().iso().required(),
  ToDate: Joi.date().iso().required(),
})


