const Joi = require("joi");

module.exports = Joi.object({
  NVMaNhanVien:  Joi.number().integer().required(),
  NVMaBenhNhan: Joi.number().integer().required(),
  NVThoiGianKhamBenh:  Joi.date().iso().required(),
  NVThoiGianRaKQ: Joi.date().iso().required(),
  ThoiGianNhapVien: Joi.date().iso().required(),
  ThoiGianXuatVien:  Joi.date().iso().required(),
 TinHTrangXuatVien: Joi.string().max(255).required(),
  GhiChuXuatVien: Joi.string().max(255).required(),
  MaBenhNhan: Joi.number().integer().required(),
 ThoiGianKhamBenh: Joi.date().iso().required(),
    ThoiGianRaKQ: Joi.date().iso().required(),
});


