const Joi = require("joi");

module.exports = Joi.object({
  MaBenhNhan: Joi.number().integer().required(),
  MaTheBHYTe: Joi.string().max(15).required(),
  NgayDangKy: Joi.date().iso().required(),
  NgayHetHan: Joi.date().iso().required()
});





