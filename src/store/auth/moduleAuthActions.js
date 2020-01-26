import axios from 'axios'

export default {
  login ({ commit }, payload) {
    axios.post('http://localhost:3006/users/login', {
      email: payload.email,
      password: payload.password
    })
      .then(function (response) {
        commit('UPDATE_AUTHENTICATED_USER', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },
  loadUserData ({ commit }) {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if (user) {
      commit('UPDATE_USER', user)
    }
  }
}
