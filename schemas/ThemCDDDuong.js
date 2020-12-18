const Joi = require("joi");

module.exports = Joi.object({
CheDoAnUong: Joi.string().max(255).required()
});




