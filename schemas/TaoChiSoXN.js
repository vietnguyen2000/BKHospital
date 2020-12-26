const Joi = require("joi");

module.exports = Joi.object({
  NguongMin:  Joi.number().integer().required(),
  NguongMax:  Joi.number().integer().required(),
});


