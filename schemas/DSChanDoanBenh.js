const Joi = require("joi");

module.exports= Joi.object({
  MaBenhNhan:  Joi.number().integer().required(),
  MaBenh:  Joi.number().integer().required()
});


