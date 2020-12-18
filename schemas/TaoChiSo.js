const Joi = require("joi");

module.exports = Joi.object({
  TenChiSo:  Joi.string().max(15).required(),
  TenXetNghiem:  Joi.string().max(15).required(),
  ThoiGianKhamBenh:  Joi.date().iso().required(),
  MaBenhNhan: Joi.number().integer().required(),
  KetQua: Joi.number().integer().required(),
  MaChiSoXetNghiem: Joi.number().integer().required()
})



