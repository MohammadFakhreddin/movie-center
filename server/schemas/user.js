const Mongoose = require('mongoose')
const Errors = require('./../utils/errors')
const UniqueValidator = require('mongoose-unique-validator');
const PassHash = require('./../utils/pass_hash')

let user = new Mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        required:false,
        type:String,
        default:""
    },
    profilePicIsSet:{
        required:false,
        type:Boolean,
        default:false
    },
    token:{
        required:false,
        type:String,
        default:""
    }
})

user.plugin(UniqueValidator)

user.statics.createNewUser = function(email,password,phoneNumber,callback){
    let _this  = this
    PassHash.hash(password,function(hashErr,hashValue){
        if(hashErr){
            callback(hashErr,null)
        }else{
            _this.create({
                email:email,
                password:hashValue,
                phoneNumber:phoneNumber,
                profilePicIsSet:false
            },callback)
        }
    })
}

user.statics.verify = function(email,password,callback){
    let _this = this
    _this.findOne({email:email},function(dbErr,dbUser){
        if(dbErr){
            callback(dbErr,null)
        }else{
            PassHash.compare(password,dbUser.password,
            function(compErr,compValue){
                if(compErr){
                    callback(compErr,null)
                }else{
                    callback(null,dbUser)
                }
            })
        }
    })
}

user.statics.updatePassword = function(userId,password,callback){
    let _this = this
    _this.findById(userId,function(dbErr,dbUser){
        if(dbErr||!dbUser){
            callback(dbErr,null)
        }else{
            PassHash.hash(password,function(hashErr,hashPassword){
                if(hashErr||!hashPassword){
                    callback(hashErr,null)
                }else{
                    _this.findByIdAndUpdate(userId,{password:hashPassword},callback)
                }
            })
        }
    })
}

user.virtual('dto').get(function(){
    let _this  = this
    return {
        email:_this.email,
        phoneNumber:_this.phoneNumber,
        profilePicIsSet:_this.profilePicIsSet
    }
})

user.set('autoIndex',false)

user.index({_id:1,email:1})

exports.User = Mongoose.model('user',user)