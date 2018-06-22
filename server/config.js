const os = require('os')

module.exports = {
    port : "8000",
    valid_origin_address : 'http://localhost:3000',
    is_dev : true,
    setEnv:function(env){
        switch (env) {
            case 'dev':
                is_dev = true
                break;
            case 'prod':
                is_dev = false
                break;
        }
    },
    exception_address: __dirname + '/log/exceptions.txt',
    log_address: __dirname + '/log/logs.txt',
    is_windwos : /^win/.test(os.platform()),
    bcrypt_rounds:10,
    token_header:'movie_center',
    mongo_url : 'mongodb://127.0.0.1:27017/movie_center?connectTimeoutMS=10000',
    session_secret: "fjeaoQZDASEFESC<<<>,,.:LMLKwad21`'ifjo;iefjoia;jefioewguihwoidjlo@i#e%h&f%u@i___o)))a-----+++lwehfoihaewuifhirue",
    token_life_time: 60 * 60 * 1//Means one day
}

