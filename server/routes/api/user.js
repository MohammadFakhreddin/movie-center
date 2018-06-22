const Express = require('express')
const ValidationHandler = require('./../../utils/validation_handler')
const UserSchema = require('./../../validation/user')
const UserDb = require('./../../schemas/user').User
const StatusCodes = require('./../../utils/status_codes')
const Logger = require('./../../utils/logger')
const JWTHandler = require('./../../utils/jwt_handler')
const Errors = require('../../utils/errors')
const Config = require('./../../config')

let router = Express.Router()

router.post('/register',new ValidationHandler.SchemaValidator(UserSchema.register).middleware,
function(req,res,next){
  let email = req.body.email
  let password = req.body.password
  UserDb.createNewUser(email,password,"",function(dbErr,dbRes){
    if(dbErr){
      res.status(StatusCodes.email_exists).json((Config.is_dev)?{err:dbErr}:null)
    }else{
      JWTHandler.sign({id:dbRes._id},JWTHandler.access_types.user,
        function(jwtError,jwtToken){
          if(jwtError){
            res.status(StatusCodes.internal)
            res.json((Config.is_dev)?{err:jwtError}:null)
            Logger.log(__filename,JSON.stringify(jwtError))
          }else{
            res.status(StatusCodes.ok).json({token:jwtToken})
          } 
        }
      )
    }
  })
})

router.post('/login',new ValidationHandler.SchemaValidator(UserSchema.login).middleware,
function(req,res,next){
  let email = req.body.email
  let password = req.body.password
  UserDb.verify(email,password,function(dbErr,dbUser){
    if(dbUser==null){
      res.status(StatusCodes.not_found)
      if(Config.is_dev){
        res.json((dbErr)?{err:dbErr}:{})
      }else{
        res.json()
      }
    }else{
      JWTHandler.sign({id:dbUser._id},JWTHandler.access_types.user,
        function(jwtError,jwtToken){
          if(jwtError){
            res.status(StatusCodes.internal)
            if(Config.is_dev){
              res.json({err:jwtError})
            }else{
              res.json()
            }
            Logger.log(__filename,JSON.stringify(jwtError))
          }else{
            res.status(StatusCodes.ok).json({token:jwtToken})
          } 
        }
      )
    }
  })
})

router.get('/user',JWTHandler.accessTokenUserMiddleware,function(req,res,next){
  console.log('Auth data is '+JSON.stringify(req.authData))
  let userId = req.authData.data.id
  console.log("User id is:"+userId)
  UserDb.findById(userId,function(dbErr,dbUser){
    if(dbErr||dbUser==null){
      res.status(StatusCodes.internal).json((Config.is_dv)?{err:dbErr}:null)
      Logger.logError(__filename,dbErr)
    }else{
      res.status(StatusCodes.ok).json({user:dbUser.dto})
    }
  })
})

router.post('/change-password',JWTHandler.accessTokenUserMiddleware,
new ValidationHandler.SchemaValidator(UserSchema.changePassword).middleware,function(req,res,next){
  let userId = req.authData.data.id
  UserDb.updatePassword(userId,req.body.password,function(dbErr,dbUser){
    if(dbErr||dbUser==null){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
      Logger.logError(__filename,dbErr)
    }else{
      res.status(StatusCodes.ok).json()
    }
  })
})

router.post('/change-phone-number',JWTHandler.accessTokenUserMiddleware,
new ValidationHandler.SchemaValidator(UserSchema.changePhoneNumber).middleware,
function(req,res,next){
  let userId = req.authData.data.id
  UserDb.findByIdAndUpdate(userId,{phoneNumber:req.body.phoneNumber},function(dbErr,dbUser){
    if(dbErr||!dbUser){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
      Logger.logError(__filename,dbErr)  
    }else{
      res.status(StatusCodes.ok).json()  
    }
  })
})

router.get('/logout',JWTHandler.accessTokenUserMiddleware,function(req,res,next){
  let userId = req.authData.data.id
  JWTHandler.expireToken(userId,JWTHandler.access_types.user,function(jwtErr,jwtUser){
    if(jwtErr||!jwtUser){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:jwtErr}:null)
    }else{
      res.status(StatusCodes.ok).json()
    }
  })
})

module.exports = router