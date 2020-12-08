const Joi = require("joi");

export const BenhNhanSchema = Joi.object({
  TaiKhoan: Joi.string().max(15).required(),
  MatKhau: Joi.string().max(100).required(),
  HoVaTenLot: Joi.string().max(30).required(),
  Ten: Joi.string().max(15).required(),
  Email: Joi.string().max(50).required(),
  SDT: Joi.string().max(15).required(),
  GioiTinh: Joi.boolean().required(),
  NgaySinh: Joi.date().format("DD/MM/YYYY").raw(),
  DanToc: Joi.string().max(15).required(),
});
