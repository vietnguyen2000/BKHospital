const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  ThoiGianKhamBenh:  Joi.date().iso().required(),
  ThoiGianRaKQ:  Joi.date().iso().required(),
  MaThuoc: Joi.number().integer().required(),
  LieuDung: Joi.number().integer().required(),
  CachDung: Joi.string().max(100).required(),
  NgayDung: Joi.number().integer().required()
});


