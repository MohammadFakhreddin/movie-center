'use strict';

const mongoose = require('mongoose')
const config = require('./../config')
const logger = require('./logger')
const errors = require('./errors')

let db = null

/**
 * @param {function(object)} callback 
 * @returns {undefined}
 */
module.exports.connect = function(callback){
    if(typeof callback !== 'function'){
        errors.internal.invalid_arg.throwError()
    }
    if(db!=null){
        callback(db)
        return
    }
    mongoose.connect(config.mongo_url)
    db = mongoose.connection
    db.on('error',function(){
        logger.logError(__filename,'Mongodb connetion error')
        callback(null)
    })
    db.once('open',function(){
        logger.log(__filename,'Connection to mongodb is successful')
        callback(db)
    })
}