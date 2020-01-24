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
  }
}
