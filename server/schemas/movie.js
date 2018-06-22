const Mongoose = require('mongoose')
const errors = require('./../utils/errors')

let movie = new Mongoose.Schema({
    createdAt : {
        type: Date,
        required: true
    },
    title : {
        type: String,
        required:true
    },
    originalTitle:{
        type: String,
        required:true
    },
    rate:{
        type:Number,
        min:0,
        max:10,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    length:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    writers:[String],
    actors:[String],
    tags:[String]
})

movie.statics.createNewMovie = function(title,originalTitle,rate,
                                year,length,country,description,director,
                                writers,actors,tags,callback){
    let _this = this
    _this.create({
        createdAt:new Date(),
        title:title,
        originalTitle:originalTitle,
        rate:rate,
        year:year,
        length:length,
        country:country,
        description:description,
        director:director,
        writers:writers,
        actors:actors,
        tags:tags
    },callback)
}

/**
 * @param {string} searchValue
 * @param {function} callback
 */
movie.statics.searchMovies = function(searchValue,callback){
    let _this = this
    if(typeof searchValue!=='string' || typeof callback!=='function'){
        errors.internal.invalid_arg.throwError()
        return
    }
    searchValue = searchValue.trim()
    _this.find({$or : [
        {
            title:{$regex:searchValue,$options:'i'}
        },
        {
            originalTitle:{$regex:searchValue,$options:'i'}
        },
        {
            description:{$regex:searchValue,$options:'i'}  
        }
    ]},callback)
}

movie.virtual('sDto').get(function(){
    let _this = this
    return {
        id : _this._id,
        title: _this.title,
        originalTitle: _this.originalTitle,
        rate : _this.rate,
        year: _this.year
    }
})

movie.virtual('dto').get(function(){
    let _this = this
    return{ 
        id:_this._id,
        createdAt:_this.createdAt,
        title:_this.title,
        originalTitle:_this.originalTitle,
        rate:_this.rate,
        year:_this.year,
        length:_this.length,
        country:_this.country,
        description:_this.description,
        director:_this.director,
        writers:_this.writers,
        actors:_this.actors,
        tags:_this.tags
    }
})

/**
 * @param {Number} length
 * @param {function} callback
 */
movie.statics.getRecentMovies = function(length,callback){
    if(typeof length!=='number'||
     typeof callback!=='function'){
        errors.internal.invalid_arg.throwError()
        return      
    }
    let _this = this
    _this.find( {} ,{}, { sort:{createdAt:-1} , limit:length},callback)
}

/**
 * @param {Number} length
 * @param {function} callback
 */
movie.statics.getTopMovies = function(length,callback){
    if(typeof length!=='number'||
    typeof callback!=='function'){
        errors.internal.invalid_arg.throwError()
        return          
    }
    this.find({},{}, { sort:{rate:-1} , limit:length},callback)
}

movie.set('autoIndex',false)

movie.index({_id:1})

exports.Movie = Mongoose.model('movie',movie)