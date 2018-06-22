import Axios from 'axios'
// import MovieInfo from '~/models/movie_info'

let httpManager = Axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json; charset=utf-8'
  }
})

let errorHandler = function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
}

const setSession = function (token) {
  Object.assign(httpManager.defaults,
    {
      headers: {'movie_center': token}
    }
  )
}

this.requestRegister = function (email, password, callback) {
  httpManager.post('user/register', {
    email: email,
    password: password
  }).then(response => {
    setSession(response.data.token)
    callback(null, response.data)
  }).catch(error => {
    errorHandler(error)
    callback(error, null)
  })
}

this.requestStaticBanner = function (callback) {
  httpManager.get('movies/static-banner')
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestLogin = function (email, password, callback) {
  httpManager.post('user/login', {
    email: email,
    password: password
  }).then(response => {
    setSession(response.data.token)
    callback(null, response.data)
  }).catch(error => {
    errorHandler(error)
    callback(error, null)
  })
}

this.requestGetUser = function (callback) {
  httpManager.get('user/user')
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestMovieComments = function (movieId, callback) {
  httpManager.get('movies/' + movieId + '/comments')
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestAddNewComment = function (movieId, text, directorRate, storyRate
  , actorRate, userSuggestionState, callback) {
  let comment = {
    text: text,
    directorRate: directorRate,
    storyRate: storyRate,
    actorRate: actorRate,
    userSuggestionState: userSuggestionState
  }
  httpManager.post('movies/' + movieId + '/comments', {
    comment: comment
  }).then(response => {
    callback(null, response.data)
  }).catch(error => {
    errorHandler(error)
    callback(error, null)
  })
}

this.requestRecentMovies = function (length, callback) {
  httpManager.get('movies/recent/' + length)
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestTopMovies = function (length, callback) {
  httpManager.get('movies/top/' + length)
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestMovieById = function (movieId, callback) {
  httpManager.get('movies/' + movieId + '/details')
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.isAuth = function () {
  let token = httpManager.defaults.headers['movie_center']
  if (token != null) {
    return true
  }
  return false
}

this.requestSearchBackground = function (callback) {
  httpManager.get('/movies/search-background')
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

this.requestSearch = function (searchValue, callback) {
  httpManager.get('/movies/search?text=' + searchValue)
    .then(response => {
      callback(null, response.data)
    }).catch(error => {
      errorHandler(error)
      callback(error, null)
    })
}

export default this
