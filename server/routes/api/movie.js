'use strict'
const Express = require('express')
const ValidationHandler = require('./../../utils/validation_handler')
const MovieSchema = require('./../../validation/movie')
const MovieDb = require('./../../schemas/movie').Movie
const StatusCodes = require('./../../utils/status_codes')
const Logger = require('./../../utils/logger')
const JWTHandler = require('./../../utils/jwt_handler')
const Errors = require('../../utils/errors')
const Config = require('./../../config')
const CommentDb = require('./../../schemas/comment').comment

let router = Express.Router()

router.get('/recent/:length',
function(req,res,next){
  if(req.params.length==null){
    res.status(StatusCodes.bad_request).json()
    return
  }
  let length = parseInt(req.params.length)
  MovieDb.getRecentMovies(length,function(dbErr,dbRes){
    if(dbErr||!dbRes)
    {
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
    }else{
      let dtoList = []
      for(let i=0;i<dbRes.length;i++){
        dtoList[i] = dbRes[i].sDto
      }
      res.status(StatusCodes.ok).json({movieList:dtoList})
    }
  })
})

router.get('/search-background',
function(req,res,next){
  // MovieDb.getRecentMovies(1,function(dbErr,dbRes){
  //   if(dbErr||!dbRes)
  //   {
  //     res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
  //   }else{
  //     let wallpaperId = dbRes[0].id
  //     res.status(StatusCodes.ok).json({wallpaperId:wallpaperId})
  //   }
  // })
  res.status(StatusCodes.ok).json({wallpaperId:'5a68b8c92134a51ae8c60ca1'})
})

router.get('/static-banner',
function(req,res,next){
  MovieDb.getRecentMovies(1,function(dbErr,dbRes){
    if(dbErr||!dbRes)
    {
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
    }else{
      let staticBanner = dbRes[0].dto
      res.status(StatusCodes.ok).json({staticBanner:staticBanner})
    }
  })
})

router.get('/top/:length',
function(req,res,next){
  if(req.params.length==null){
    res.status(StatusCodes.bad_request).json()
    return
  }
  let length = parseInt(req.params.length)
  MovieDb.getTopMovies(length,function(dbErr,dbRes){
    if(dbErr||!dbRes)
    {
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)
    }else{
      let dtoList = []
      for(let i=0;i<dbRes.length;i++){
        dtoList[i] = dbRes[i].sDto
      }
      res.status(StatusCodes.ok).json({movieList:dtoList})
    }
  })
})

router.get('/:movieId/details',
function(req,res,next){
  if(typeof req.params.movieId!='string'){
    res.status(StatusCodes.bad_request).json()
    return
  }
  MovieDb.findById(req.params.movieId,function(dbErr,dbRes){
    if(dbErr||!dbRes){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null) 
    }else{
      res.status(StatusCodes.ok).json({movie:dbRes.dto})
    }
  })
})

router.get('/:movieId/comments',
function(req,res,next){
  if(typeof req.params.movieId!='string'){
    res.status(StatusCodes.bad_request).json()
    return
  }
  CommentDb.getMovieComments(req.params.movieId,function(dbErr,dbRes){
    if(dbErr||!dbRes){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null) 
    }else{
      let totalScore = CommentDb.getTotalScore(dbRes)
      console.log("Totoa score is"+totalScore)
      let dtoList = []
      for(let i=0;i<dbRes.length;i++){
        dtoList[i] = dbRes[i].dto
      }
      res.status(StatusCodes.ok).json({commentList:dtoList,totalScore:totalScore})
    }
  })
})

router.post('/:movieId/comments',JWTHandler.accessTokenUserMiddleware,
new ValidationHandler.SchemaValidator(MovieSchema.addComment).middleware,
function(req,res,next){
  if(req.params.movieId==null){
    res.status(StatusCodes.bad_request).json()
    return
  }else{
    let commentObj = req.body.comment
    CommentDb.createNewComment(req.params.movieId,req.authData.data.id,
    commentObj.text,commentObj.directorRate,commentObj.storyRate,
    commentObj.actorRate,0,0,commentObj.userSuggestionState,
    function(dbErr,dbRes){
      if(dbErr||!dbRes){
        res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null)     
      }else{
        res.status(StatusCodes.ok).json()
      }
    })
  }
})

router.get('/search',
function(req,res,next){
  let searchValue = req.query.text
  MovieDb.searchMovies(searchValue,function(dbErr,dbRes){
    if(dbErr||!dbRes){
      res.status(StatusCodes.internal).json((Config.is_dev)?{err:dbErr}:null) 
    }else{
      let movieSDtoList = []
      for(let i=0;i<dbRes.length;i++){
        movieSDtoList[i] = dbRes[i].sDto
      }
      res.status(StatusCodes.ok).json({movieList:movieSDtoList})
    }
  })
})

module.exports =  router