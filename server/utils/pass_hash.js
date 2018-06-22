'use strict';
const config = require('../config');
const errors = require('./errors');
let bcrypt = null;
if (config.is_windwos) {
    bcrypt = require('bcryptjs');
} else {
    bcrypt = require('bcrypt');
}

/** 
 * @param {string} pass 
 * @param {function(object,object)} callback 
 */
exports.hash = function (pass, callback) {
    if (typeof pass === 'string' && typeof callback === 'function') {
        bcrypt.hash(pass, config.bcrypt_rounds, function (err, hash) {
            callback(err, hash);
        });
    } else {
        errors.internal.INVALID_ARG.thorwError();
    }
};

/** 
 * @param {string} data
 * @param {string} hash 
 * @param {function(object,object)} callback 
 */
exports.compare = function (data, hash, callback) {
    if (typeof data !== "string" || typeof hash !== "string" || typeof  callback !== "function") {
        errors.internal.INVALID_ARG.thorwError();
        return
    }
    bcrypt.compare(data, hash, function (err, res) {
        callback(err, res);
    });
};
