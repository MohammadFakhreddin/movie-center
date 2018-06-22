'use strict';
/**
 * Created by M.Fakhreddin
 */
const JWT = require('jsonwebtoken')
const Errors = require('./errors')
const Config = require('./../config')
const StatusCodes = require('./status_codes')
const Logger = require('./logger')
const UserDb = require('./../schemas/user').User

const createExpireTime = function(){
    return Math.floor( Date.now() / 1000 ) + Config.token_life_time
}

let access_types = {
    admin:-1,
    user:1
}

exports.access_types = access_types

/**
 * @param {object} data 
 * @param {function} callback 
 * @returns {undefined}
 */
const sign = function(data,type,callback){
    if(typeof data !== 'object'||typeof callback!=='function'){
        Errors.internal.invalid_arg.throwError()
        return
    }
    return JWT.sign({
        exp: createExpireTime(),
        data: data,
        accessType: type
    },Config.session_secret,
    (type==access_types.admin)?callback:function(jwtErr,jwtToken){
        UserDb.findByIdAndUpdate(data.id,{token:jwtToken},function(dbErr,dbUser){
            if(dbErr){
                callback(dbErr,null)
            }else{
                callback(null,jwtToken)
            }
        })
    })
}

/**
 * @param {string} token
 * @param {function({object,object})} callback
 * @return {undefined}
 * */
const verify = function (token, callback) {
    if (typeof token !== 'string' ||
        typeof callback!=='function')  {
        Errors.internal.invalid_arg.throwError()
        return
    }
    JWT.verify(token, Config.session_secret, callback);
};

const accessTokenMiddleWare = function(req,res,next,type){
    let token = req.headers[Config.token_header];
    let sendUnauthorizedError = function(){
        res.status(StatusCodes.unauthorized)
        if(Config.is_dev){
            res.status(StatusCodes.unauthorized).json({err:"Invalid access type"});        
        }else{
            res.status(StatusCodes.unauthorized).json();        
        }
    }
    if(token==null){
        res.status(StatusCodes.unauthorized).json()
        return
    }
    verify(token, function (err, authData) {
        if (err) {
            res.status(StatusCodes.unauthorized)
            if(Config.is_dev){
                res.json({err:err})
            }else{
                res.json()
            }
        } else {
            if(authData!==null && 
                authData.accessType==type){
                if(authData.access_type==access_types.user){
                    UserDb.findById(authData.id,function(dbErr,dbUser){
                        if(dbErr||!dbUser){
                            sendUnauthorizedError()   
                        }else{
                            if(dbUser.token==token){
                                req.authData = authData
                                next()
                            }else{  
                                sendUnauthorizedError()
                            }
                        }
                    })
                }else{
                    req.authData = authData;
                    next();
                }
            }else{
                sendUnauthorizedError()
            }
        }
    })
}

/**
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 * */
exports.accessTokenUserMiddleware = function (req, res, next) {
    accessTokenMiddleWare(req,res,next,access_types.user)
};

/**
 * @param req
 * @param res
 * @param next
 * @return {undefined}
 * */
exports.accessTokenAdminMiddleware = function (req, res, next) {
    accessTokenMiddleWare(req,res,next,access_types.admin)
};

exports.expireToken = function(userId,accessType,callback){
    if(accessType==access_types.user){
        UserDb.findByIdAndUpdate(userId,{token:""},callback)  
    }else{//It is supported only by user
        callback(null,null)    
    }
}

//TODO Implement a backlist for verification

exports.sign = sign
exports.verify = verify