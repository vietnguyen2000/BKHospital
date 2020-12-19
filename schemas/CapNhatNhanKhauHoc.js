const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  HoVaTenLot: Joi.string().max(30).required(),
  Ten: Joi.string().max(15).required(),
  SDT: Joi.string().max(15).required(),
  NgaySinh: Joi.date().iso().required(),
  DanToc: Joi.string().max(15).required()
});





