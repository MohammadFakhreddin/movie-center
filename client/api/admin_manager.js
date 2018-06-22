import Axios from 'axios'

let httpManager = Axios.create({
  baseURL: 'http://localhost:8000/api/admin/',
  timeout: 10000,
  headers: {
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

this.isAuth = function () {
  let token = httpManager.headers['movie_center']
  if (token !== null) {
    return true
  }
  return false
}

this.requestLogin = function (username, password, onComplete, onFailure) {
  httpManager.post('login', {
    username: username,
    password: password
  }, { headers: {'Content-Type': 'application/json'} }
  ).then(response => {
    let token = response.data.token
    Object.assign(httpManager.defaults,
      {
        headers: {'movie_center': token}
      }
    )
    onComplete(null)
  }).catch(error => {
    errorHandler(error)
    onFailure()
  })
}

this.requestAllMovies = function (onComplete, onFailure) {
  httpManager.get('all-movies')
    .then(response => {
      onComplete(response.data.movieList)
    }, { headers: {'Content-Type': 'application/json'} }
    ).catch(error => {
      errorHandler(error)
      onFailure()
    })
}

this.requestUploadWallpaper = function (movieId, file, onComplete, onFailure) {
  let formData = new FormData()
  formData.set('file', file)
  httpManager.post('upload-wallpaper/' + movieId,
    formData
    , { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => {
      onComplete(null)
    }).catch(error => {
      errorHandler(error)
      onFailure()
    })
}

this.requestUploadPoster = function (movieId, file, onComplete, onFailure) {
  let formData = new FormData()
  formData.set('file', file)
  httpManager.post('upload-poster/' + movieId,
    formData
    , { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => {
      onComplete(null)
    }).catch(error => {
      errorHandler(error)
      onFailure()
    })
}

this.requestUpdateMovie = function (movieId, title, originalTitle, rate,
  year, length, country, description, director, writers, actors, tags,
  onComplete, onFailure) {
  httpManager.post('update-movie/' + movieId, {
    movie: {
      title: title,
      originalTitle: originalTitle,
      rate: rate,
      year: year,
      length: length,
      country: country,
      description: description,
      director: director,
      writers: writers,
      actors: actors,
      tags: tags
    }
  }, { headers: {'Content-Type': 'application/json'} }
  ).then(response => {
    onComplete(null)
  }).catch(error => {
    errorHandler(error)
    onFailure()
  })
}

this.requestRemoveMovie = function (movieId, onComplete, onFailure) {
  httpManager.get('remove-movie/' + movieId)
    .then(response => {
      onComplete(null)
    }, { headers: {'Content-Type': 'application/json'} }
    ).catch(error => {
      errorHandler(error)
      onFailure()
    })
}

this.requestAddNewMovie = function (title, originalTitle, rate, year,
  length, country, description, director, writers, actors, tags,
  onComplete, onFailure) {
  httpManager.post('submit-movie', {
    movie: {
      title: title,
      originalTitle: originalTitle,
      rate: rate,
      year: year,
      length: length,
      country: country,
      description: description,
      director: director,
      writers: writers,
      actors: actors,
      tags: tags
    }
  }, { headers: {'Content-Type': 'application/json'} }
  ).then(response => {
    onComplete(null)
  }).catch(error => {
    errorHandler(error)
    onFailure()
  })
}

export default this
