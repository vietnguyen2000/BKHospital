const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  ThoiGianKhamBenh:  Joi.date().iso().required(),
  ThoiGianRaKQ:  Joi.date().iso().required()
});





