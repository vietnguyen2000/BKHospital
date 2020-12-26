const Joi = require("joi");

module.exports = Joi.object({
  CaTruc: Joi.string().max(15).required(),
  NgayTruc: Joi.date().iso().required(),
  MaKhoaDieuTri: Joi.number().required(),
})

