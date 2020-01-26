import axios from 'axios'

export default {
  getPosts ({ commit }, payload) {
    return axios.get('http://localhost:3006/posts/getPosts', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')).accessToken
      }

    })
      .then(function (response) {
        commit('GET_POSTS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
