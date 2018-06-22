/**
 * Created by mohammad.fakhreddin on 26/09/2017.
 */
'use strict';
const fs = require('fs');
const config = require('../config');
const errors = require('./errors');

/**
 * @param {string} filename 
 * @param {string} message 
 */
exports.log = function (filename, message) {
    if (typeof filename !== "string" || filename === "") {
        errors.internal.invalid_arg.throwError();
        return
    }
    if (config.is_dev) {
        console.log(message, filename);
    } else {
        if (fs.existsSync(config.log_address)) {
            fs.appendFile(config.log_address, message.concat(filename), 'utf8', function () {
            });
        } else {
            fs.writeFile(config.log_address, message.concat(filename), 'utf8', function () {
            });
        }
    }
};

/**
 * @param {string} filename 
 * @param {string} message 
 */
exports.logError = function (filename, message) {
    if (filename === null || filename === "") {
        errors.internal.invalid_arg.throwError();
        return
    }
    writeError(filename,message)
};

/**
 * @param {string} filename 
 * @param {string} message 
 */
let writeError = function(filename,message){
    if (config.is_dev) {
        console.error(message, filename);
    }else{
        if (fs.existsSync(config.exception_address)) {
            fs.appendFileSync(config.exception_address, message.concat(filename), 'utf8');
        } else {
            fs.writeFileSync(config.exception_address, message.concat(filename), 'utf8')
        }
    }
}

exports.writeError = writeError