const db = require('nedb')

// setup goes here

module.exports = {
  install (vue) {
    vue.prototype.$db = db
  }
}
