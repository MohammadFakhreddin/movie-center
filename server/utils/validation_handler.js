const StatusCodes = require('./status_codes')
const Joi = require('joi')
const Config = require('./../config')

exports.SchemaValidator = function(schema){
    let _this = this
    _this.middleware = function(req,res,next){
        Joi.validate(req.body,schema,function(err,value){
            if(err){
                if(Config.is_dev){
                    res.status(StatusCodes.bad_request).json({
                        err:err
                    })
                }else{
                    res.status(StatusCodes.bad_request).json()
                }
            }else{
                next()
            }
        })
    }
}