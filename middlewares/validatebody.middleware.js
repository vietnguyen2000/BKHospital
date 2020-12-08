const Joi = require("joi");

export function commonValidateBody(schema) {
  return (req, res, next) => {
    const value = req["body"];
    return Joi.validate(value, schema)
      .then(() => {
        return next();
      })
      .catch((errors) => {
        const firstError = errors.details[0];
        const error = {
          code: firstError.type,
          message: firstError.message,
        };

        return res.json(error);
      });
  };
}
