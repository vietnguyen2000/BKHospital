const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  TrieuChung: Joi.string().max(1000).required(),
  ThoiGianKhamBenh: Joi.date().iso().required()
});




