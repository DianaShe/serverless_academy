const HttpError = require("../utils/httpError");

const validateUrl = (schema) => {
    const func = (req, res, next) => {
      const { error } = schema.validate(req.body);
      console.log(error)
      if (error) {
        next(HttpError(400, "Missing required field"));
      }
      next();
    };
    return func;
  };

module.exports = validateUrl