import Vue from 'vue'
const Datastore = require('nedb')
const db = new Datastore({filename: 'notes', autoload: true})
db.loadDatabase()

const state = {
  notes: null,
  current: null
}

const mutations = {
  SET_NOTES (state, notes) {
    state.notes = notes
  },
  SET_CURRENT (state, id) {
    state.current = id
  },
  ADD_NOTE (state, note) {
    state.notes.push(note)
  },
  DELETE_NOTE (state, id) {
    let index = state.notes.findIndex(note => note._id === id)
    state.notes.splice(index, 1)
  },
  UPDATE_NOTE (state, note) {
    let index = state.notes.findIndex(n => n._id === note._id)
    Vue.set(state.notes, index, note)
  }
}

const getters = {
  notes: state => {
    return state.notes
  },
  filtered: state => searchQuery => {
    let filtered = state.notes
    if (searchQuery) {
      filtered = state.notes.filter(m => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 || m.content.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    }
    return filtered
  },
  currentNote: state => {
    return state.notes.filter(note => note._id === state.current)[0]
  }
}

const actions = {
  loadNotes ({ commit }) {
    db.find({}, function (_err, data) {
      commit('SET_NOTES', data)
    })
  },
  async addNote ({commit, dispatch}, note) {
    note = JSON.parse(JSON.stringify(note))
    note.created_at = new Date().getTime()
    note.updated_at = new Date().getTime()
    db.insert(note, (_err, newNote) => {
      commit('ADD_NOTE', newNote)
      dispatch('setCurrent', newNote._id)
    })
  },
  async updateNote ({commit}, note) {
    note.updated_at = new Date().getTime()
    db.update({ _id: note._id }, note, {}, () => commit('UPDATE_NOTE', note))
  },
  deleteNote ({commit}, id) {
    db.remove({_id: id}, {}, () => commit('DELETE_NOTE', id))
  },
  setCurrent ({commit}, id) {
    commit('SET_CURRENT', id)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
