const Joi = require("joi");

module.exports = Joi.object({
  TaiKhoan:  Joi.string().max(15).required(),
  MatKhau: Joi.string().max(100).required(),
  HoVaTenLot: Joi.string().max(30).required(),
  Ten: Joi.string().max(15).required(),
  Email: Joi.string().max(50).required(),
  SDT: Joi.string().max(15).required(),
  GioiTinh: Joi.number().valid(1,0),
  NgaySinh: Joi.date().iso().required(),
  MaKhoaDieuTri: Joi.number().integer().required()
});





