export default function MovieInfo () {
  let obj = {}

  obj.fillData = function (title, director, genre, rating, storyLine,
    year, writers, stars, languages, length, countries, description) {
    obj.title = title
    obj.director = director
    obj.genre = genre
    obj.rating = rating
    obj.storyLine = storyLine
    obj.year = year
    obj.writers = writers
    obj.stars = stars
    obj.languages = languages
    obj.length = length
    obj.countries = countries
    obj.description = description
  }

  obj.fillWithRawObj = function (rawObj) {
    obj.title = rawObj.title
    obj.director = rawObj.director
    obj.genre = rawObj.genre
    obj.rating = rawObj.rating
    obj.storyLine = rawObj.storyLine
    obj.year = rawObj.year
    obj.writers = rawObj.writers
    obj.stars = rawObj.stars
    obj.languages = rawObj.metadata.languages
    obj.length = rawObj.length
    obj.countries = rawObj.metadata.countries
    obj.description = rawObj.description
  }

  let _convertArrayToString = function (array) {
    let value = ''
    for (let i = 0; i < array.length; i++) {
      value += array[i]
      if (i !== array.length - 1) {
        value += ','
      }
    }
    return value
  }

  obj.getMovieWriters = function () {
    return _convertArrayToString(obj.writers)
  }

  obj.getMovieStars = function () {
    return _convertArrayToString(obj.stars)
  }

  return obj
}
