const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  ThoiGianKhamBenh: Joi.date().iso().raw().required(),
  ThoiGianRaKQ: Joi.date().iso().raw().required(),
  MaBenh: Joi.number().integer().required(),
});
