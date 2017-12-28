/* global localStorage */

module.exports = function (name) {
  function get () {
    return Promise.resolve()
    .then(() => localStorage.getItem(name))
    .then(data => JSON.parse(data))
  }
  function save (item) {
    return Promise.resolve()
    .then(() => JSON.stringify(item))
    .then(data => localStorage.setItem(name, data))
    .then(() => item)
  }
  return { get, save }
}
