const Joi = require("joi");

export const ThuocSchema = Joi.object({
  TenThuoc: Joi.string().max(255).required(),
});
