exports.convertDateToString = function (date) {
  let day = date.getDate()
  let monthIndex = date.getMonth()
  let year = date.getFullYear()
  return year + '/' + (monthIndex+1) + '/' + day
}
