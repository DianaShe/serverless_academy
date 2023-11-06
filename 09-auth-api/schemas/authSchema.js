const Joi = require("joi");

const authSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    
})

module.exports = authSchema