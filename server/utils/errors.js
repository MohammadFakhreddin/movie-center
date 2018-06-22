/**
 * Created by mohammad.fakhreddin on 27/09/2017.
 */
'use strict';

const MError = function(code,description) {
    let _this = this
    _this.code = code
    _this.description = description
    _this.throwError = function(){
        throw new Error(_this.description)
    }
    return _this
}

exports.internal = {
    invalid_arg: new MError(1, 'Invalid arguments'),
    mongo_db_connection_failed: new MError(2, 'Failed to create new mongodb collection object')
};

exports.statusCodes = {
    "407" : "کاربری با این ایمیل وجود دارد" ,
    "406" : "نام کاربری یا نام عبور اشتباه است ",
}
// exports.external = {
//     bad_request: new MError(400,'Invalid args'),
//     internal_server_error : new MError(500,'Internal server error'),
//     not_authorized : new MError(403,'Not authorized')   
// }