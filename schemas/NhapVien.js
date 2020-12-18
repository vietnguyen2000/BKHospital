const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  ThoiGianKhamBenh:  Joi.date().iso().required(),
  ThoiGianRaKQ: Joi.date().iso().required(),
  ThoiGianNhapVien: Joi.date().iso().required(),
  SoGiuong: Joi.number().integer().required(),
  SoBuong: Joi.number().integer().required(),
  TinhTrangNhapVien:  Joi.string().max(255).required(),
});


