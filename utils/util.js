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

const app_secret = "4702b42e60d35f734e63c949a7678d83"

const tx_map_key = "EOZBZ-UXK3V-FNOPW-UJ7P4-D7NT3-27FUU"

module.exports = {
  formatTime: formatTime,
  getParameter: getParameter,
  domain: domain,
  app_secret: app_secret,
  tx_map_key: tx_map_key
}