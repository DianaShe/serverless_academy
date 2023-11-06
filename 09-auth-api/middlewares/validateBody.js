const HttpError = require("../utilities/HttpError");

const validateBody = (schema) => {
  
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

module.exports = validateBody;