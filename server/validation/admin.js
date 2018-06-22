const Joi = require('joi');

exports.submitOrUpdateMovie = {
    movie:Joi.object({
        title:Joi.string().required(),
        originalTitle:Joi.string().required(),
        rate:Joi.number().required().min(0).max(10),
        year:Joi.number().required(),
        length:Joi.number().required(),
        country:Joi.string().required(),
        description:Joi.string().required(),
        director:Joi.string().required(),
        writers:Joi.array().items(Joi.string().required()),
        actors:Joi.array().items(Joi.string().required()),
        tags:Joi.array().items(Joi.string().required())    
    }).required()
}

exports.login = {
    username:Joi.string().required(),
    password:Joi.string().required()
}
