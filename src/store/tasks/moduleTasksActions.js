import axios from 'axios'

export default {
  getTasks ({ commit }, payload) {
    return axios.get('http://localhost:3006/tasks/getTasks', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')).accessToken
      }

    })
      .then(function (response) {
        commit('GET_TASKS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
