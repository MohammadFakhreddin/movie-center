this.convertDateToString = function (date) {
  let day = date.getDate()
  let monthIndex = date.getMonth()
  let year = date.getFullYear()
  return year + '/' + monthIndex + '/' + day
}

export default this
