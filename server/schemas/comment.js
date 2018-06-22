const Mongoose = require('mongoose')
const MovieDb = require('./movie').Movie
const UserDb = require('./user').User
const Errors = require('./../utils/errors')
const Time = require('./../utils/time')

let comment = Mongoose.Schema({
    movieId:{
        type:Mongoose.Schema.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    authorId:{
        type:Mongoose.Schema.ObjectId,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    directorRate:{
        type:Number,
        min:0,
        max:10,
        required:true
    },
    storyRate:{
        type:Number,
        min:0,
        max:10,
        required:true
    },
    actorRate:{
        type:Number,
        min:0,
        max:10,
        required:true
    },
    likeCount:{
        type:Number,
        min:0,
        required:false,
        default:0
    },
    dislikeCount:{
        type:Number,
        min:0,
        default:0
    },
    userSuggestionState:{
        type:Number,
        min:-1,
        max:1,
        required:true
    }
})

comment.virtual('rate').get(function(){
    let _this = this
    if(_this.rateVal!=null){
        return _this.rateVal
    }
    _this.rateVal = Math.round((_this.storyRate +
        _this.actorRate + _this.directorRate)/3)
    return _this.rateVal
})

comment.virtual('dto').get(function(){
    let _this = this
    return {
        id:_this._id,
        movieId:_this.movieId,
        createdAt:Time.convertDateToString(_this.createdAt),
        authorId:_this.authorId,
        authorName:_this.authorName,
        text:_this.text,
        directorRate:_this.directorRate,
        storyRate:_this.storyRate,
        actorRate:_this.actorRate,
        likeCount:_this.likeCount,
        dislikeCount:_this.dislikeCount,
        rate:_this.rate,
        userSuggestionState:_this.userSuggestionState
    }
})

comment.statics.getMovieComments = function(movieId,callback){
    let _this = this
    _this.find({movieId:movieId},callback)
}

comment.statics.getTotalScore = function(commentList){
    if(commentList.length===0){
        return 0
    }
    let sum = 0
    for(let i=0;i<commentList.length;i++){
        sum += commentList[i].rate
    }
    return (sum/commentList.length)
}

/**
 * @param {String} movieId
 * @param {String} authorId
 * @param {String} text
 * @param {Number} directorRate
 * @param {Number} storyRate
 * @param {Number} actorRate
 * @param {Number} likeCount
 * @param {Number} dislikeCount
 * @param {function} callback
 */
comment.statics.createNewComment = function(movieId,authorId,
                                text,directorRate,storyRate,
                                actorRate,likeCount,dislikeCount,
                                userSuggestionState,callback){
    if(typeof movieId!=='string'|| typeof authorId!=='string'||
    typeof text!=='string' || typeof directorRate!=='number'||
    typeof storyRate!=='number'||typeof actorRate!=='number'||
    typeof likeCount!=='number' || typeof dislikeCount!=='number'||
    typeof userSuggestionState!=='number'|| typeof callback!=='function'){
        Errors.internal.invalid_arg.throwError()
        return   
    }
    let _this = this
    MovieDb.findById(movieId,function(movieDbErr,movieDbRes){
        if(movieDbErr||!movieDbRes){
            callback(movieDbErr,null)
        }else{
            let movieIdObj = movieDbRes._id
            UserDb.findById(authorId,function(userDbErr,userDbRes){
                if(userDbErr||!userDbRes){
                    callback(userDbErr,null)
                }else{
                    let authorIdObj = userDbRes._id
                    let authorName = userDbRes.email
                    _this.create({
                        movieId:movieIdObj,
                        createdAt:new Date(),
                        authorId:authorIdObj,
                        authorName:authorName,
                        text:text,
                        directorRate:directorRate,
                        storyRate:storyRate,
                        actorRate:actorRate,
                        likeCount:likeCount,
                        dislikeCount:dislikeCount,
                        userSuggestionState:userSuggestionState
                    },callback)
                }
            })
        }
    })
}

comment.set('autoIndex',false)

comment.index({_id:1,movieId:1})

exports.comment = Mongoose.model('comment',comment)