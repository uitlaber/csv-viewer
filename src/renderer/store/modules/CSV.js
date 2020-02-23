const Datastore = require('nedb')
const db = new Datastore({
  filename: 'csv',
  autoload: true
})
db.loadDatabase()

const state = {
  csv_path: null
}

const mutations = {
  SET_PATH (state, path) {
    state.csv_path = path
  }
}

const getters = {
  getPath: state => {
    return state.csv_path
  }
}

const actions = {
  setPath ({
    commit
  }, path) {
    commit('SET_PATH', path)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
