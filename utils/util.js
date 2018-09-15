const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var getParameter = function(page) {
  let pg = "page=" + (page ? page : 1)
  let ver = "ver=" + "iphone"
  return [pg, ver].join("&")
}

const domain = "http://paper-cdn.2q10.com"

module.exports = {
  formatTime: formatTime,
  getParameter: getParameter,
  domain: domain
}