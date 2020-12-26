const Joi = require("joi");

module.exports = Joi.object({
 MaNhanVien: Joi.number().integer().required(),
  MaBenhNhan: Joi.number().integer().required(),
ThoiGianKhamBenh:  Joi.date().iso().required(),
KetQua: Joi.string().max(15).required(),
   MaNhanVienThucHien: Joi.number().integer().required(),
ThoiGianThucHien:    Joi.date().iso().required(),
})
