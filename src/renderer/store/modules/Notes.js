var Datastore = require('nedb')
var db = new Datastore({filename: 'notes'})
db.loadDatabase()

const state = {
  notes: null
}

const mutations = {
  SET_NOTES (state, notes) {
    state.notes = notes
  },
  ADD_NOTE (state, note) {
    state.notes.push(note)
  },
  DELETE_NOTE (state, id) {
    let index = state.notes.findIndex(note => note._id === id)
    state.notes.splice(index, 1)
  }
}

const getters = {
  notes: state => {
    return state.notes
  },
  filtered: state => searchQuery => {
    let filtered = state.notes
    if (searchQuery) {
      filtered = state.notes.filter(m => m.site.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    }
    return filtered
  }
}

const actions = {
  loadNotes ({ commit }) {
    db.find({}, function (_err, data) {
      commit('SET_NOTES', data)
    })
  },
  addNote ({commit}, note) {
    console.log(note)
    db.insert(note)
    commit('ADD_NOTE', note)
  },
  deleteNote ({commit}, id) {
    db.remove({_id: id}, {})
    commit('DELETE_NOTE', id)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
