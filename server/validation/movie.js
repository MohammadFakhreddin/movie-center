const Joi = require('joi');

exports.addComment = {
    comment:Joi.object({
        text:Joi.string().required(),
        directorRate:Joi.number().min(0).max(10).required(),
        storyRate:Joi.number().min(0).max(10).required(),
        actorRate:Joi.number().min(0).max(10).required(),
        userSuggestionState:Joi.number().min(-1).max(1).required()
    }).required()
}

