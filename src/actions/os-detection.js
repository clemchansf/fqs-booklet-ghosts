const is_iOS = () => {
  return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ? true : false
}
const is_android = () => {
  return navigator.userAgent.match(/Android/i)
}
module.exports = {
    is_iOS,
    is_android,
}
