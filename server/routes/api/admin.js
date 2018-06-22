const Express = require('express')
const ValidationHandler = require('./../../utils/validation_handler')
const AdminSchema = require('./../../validation/admin')
const MovieDb = require('./../../schemas/movie').Movie
const StatusCodes = require('./../../utils/status_codes')
const Logger = require('./../../utils/logger')
const JWTHandler = require('./../../utils/jwt_handler')
const Errors = require('../../utils/errors')
const Multer  = require('multer')
const Path = require('path')
const Fs = require('fs')

const posters_address = __dirname + '/../../public/images/posters/'
const temprary_address = __dirname + '/../../public/temporary/'
const wallpaper_address = __dirname + '/../../public/images/wallpapers/'

const storage = Multer.diskStorage({
    destination: Path.resolve( temprary_address ),
    filename(req, file, callback) {
        let fileType = Path.extname(file.originalname).toLowerCase()//TODO check for file type
        callback(null, 'temp-file'+Date.now()+fileType);
    },
});

let router = Express.Router()

router.post('/submit-movie',JWTHandler.accessTokenAdminMiddleware,
new ValidationHandler.SchemaValidator(AdminSchema.submitOrUpdateMovie).middleware
,function(req,res,next){
    let movie = req.body.movie
    MovieDb.createNewMovie(movie.title,movie.originalTitle,
    movie.rate,movie.year,movie.length,movie.country,
    movie.description,movie.director,movie.writers,
    movie.actors,movie.tags,function(dbErr,dbRes){
        if(dbErr){
            res.status(StatusCodes.create_failed).json()
            throw dbErr
        }else{
            res.status(StatusCodes.ok).json()
        }
    })
})

router.post('/upload-poster/:movieId',JWTHandler.accessTokenAdminMiddleware,
Multer({ storage }).single('file'),function(req,res,next){
    const movieId = req.params.movieId
    if(movieId==null){
        res.status(StatusCodes.bad_request).json()
        return
    }
    let targetPath = Path.resolve( posters_address + movieId +'.png' );
    saveImage(req,res,next,targetPath)
})

router.post('/upload-wallpaper/:movieId',JWTHandler.accessTokenAdminMiddleware,
Multer({ storage }).single('file'),function(req,res,next){
    const movieId = req.params.movieId
    if(movieId==null){
        res.status(StatusCodes.bad_request).json()
        return
    }
    let targetPath = Path.resolve( wallpaper_address + '/' + movieId + '.png' );
    saveImage(req,res,next,targetPath)
})

const saveImage = function(req,res,next,targetPath){
    const file = req.file; // file passed from client
    if(req.file){
        console.log(req.file)
        let posterFile = req.file.poster
        let tempPath = req.file.path
        movieId = req.params.movieId
        Logger.log(__filename,'targetPath:'+targetPath)
        let fileType = Path.extname(req.file.originalname).toLowerCase()
        if (fileType === '.png' || fileType === '.jpg') {
            Fs.rename(tempPath, targetPath, function(fsErr,fsRes) {
                if (fsErr){
                    res.status(StatusCodes.internal).json()
                    throw fsErr
                }else{
                    res.status(StatusCodes.ok).json()
                }
            });
        } else {
            Fs.unlink(tempPath, function (fsErr,fsRes) {
                if (fsErr){
                    res.status(StatusCodes.internal).json()
                    throw fsErr
                }else{
                    res.status(StatusCodes.bad_request).json()     
                }
            });
        }
    }else{
        res.status(StatusCodes.bad_request).json()
    }
}

//TODO It might need pagination in future
router.get('/all-movies',JWTHandler.accessTokenAdminMiddleware,
function(req,res,next){
    MovieDb.find({},function(dbErr,dbRes){
        if(dbErr){
            res.status(StatusCodes.internal).json()
            throw dbErr
        }else{
            res.status(StatusCodes.ok).json({
                movieList:dbRes
            })
        }
    })
})

router.post('/update-movie/:movieId',JWTHandler.accessTokenAdminMiddleware,
new ValidationHandler.SchemaValidator(AdminSchema.submitOrUpdateMovie).middleware,
function(req,res,next){
    let movieId = req.params.movieId
    let movie = req.body.movie
    if(movieId == null){
        res.status(StatusCodes.bad_request).json() 
    }else{
        MovieDb.findByIdAndUpdate(movieId,movie,function(dbErr,dbRes){
            if(dbErr){
                res.status(StatusCodes.bad_request).json()
                throw dbErr
            }else{
                res.status(StatusCodes.ok).json()
            }
        }) 
    }
})

router.get('/remove-movie/:movieId',JWTHandler.accessTokenAdminMiddleware,
function(req,res,next){
    if(req.params.movieId!==null){
        MovieDb.findByIdAndRemove(req.params.movieId,function(dbErr,dbRes){
            if(dbErr){
                res.status(StatusCodes.internal).json()
                Logger.logError(dbErr)
            }else{
                Fs.unlink(posters_address+movieId+'.png',function(fsErr,fsRes){
                    if(fsErr){
                        throw fsErr
                    }
                })
                Fs.unlink(wallpaper_address+movieId+'.png',function(fsErr,fsRes){
                    if(fsErr){
                        throw fsErr
                    }
                })
                res.status(StatusCodes.ok).json()
            }
        })
    }else{
        res.status(StatusCodes.bad_request).json()
    }
})

router.post('/login',new ValidationHandler.SchemaValidator(AdminSchema.login).middleware,
function(req,res,next){
    let username = req.body.username
    let password = req.body.password
    // Logger.log(__filename,"username:"+username+" password:"+password+"\n")
    if(username === 'admin' && password === '1234'){
        JWTHandler.sign({username:username},JWTHandler.access_types.admin,
            function(jwtErr,jwtToken){
                if(jwtErr){
                    res.status(StatusCodes.internal).json()
                    Logger.logError(jwtErr)
                }else{
                    res.status(StatusCodes.ok).json({token:jwtToken})
                }
            }
        )
    }else{
        res.status(StatusCodes.invalid_username_password).json()
    }
})

module.exports = router