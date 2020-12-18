const Joi = require("joi");

module.exports = Joi.object({
  ThoiGianNhapVien: Joi.date().iso().required(),
  NVThoiGianRaKQ: Joi.date().iso().required(),
  NVThoiGianKhamBenh:  Joi.date().iso().required(),
  NVMaNhanVien:  Joi.number().integer().required(),
  NVMaBenhNhan: Joi.number().integer().required(),
  SoGiuong: Joi.number().integer().required(),
  SoBuong: Joi.number().integer().required(),
  TinhTrangNhapVien:  Joi.string().max(255).required(),
  ThoiGianXuatVien:  Joi.date().iso().required(),
  TinHTrangXuatVien: Joi.string().max(255).required(),
  GhiChuXuatVien: Joi.string().max(255).required(),
  XVThoiGianRaKQ: Joi.date().iso().required(),
  XVThoiGianKhamBenh: Joi.date().iso().required(),
  XVMaNhanVien: Joi.number().integer().required(),
  XVMaBenhNhan: Joi.number().integer().required(),
});
