const Joi = require('joi');

exports.login = {
    email:Joi.string().email().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}

exports.register = {
    email:Joi.string().email().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}

exports.changePassword = {
  password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()  
}
