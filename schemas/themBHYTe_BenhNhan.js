const Joi = require("joi");

module.exports = Joi.object({
  MaTheBHYTe: Joi.string().max(15).required(),
  NgayDangKy: Joi.date().iso().required(),
  NgayHetHan: Joi.date().iso().required()
});





