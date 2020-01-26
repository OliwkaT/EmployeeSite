import axios from 'axios'

export default {
  getPosts ({ commit }) {
    return axios.get('http://localhost:3006/posts/getPosts', {
      headers: {
        Authorization: localStorage.getItem('token')
      }

    })
      .then(function (response) {
        commit('GET_POSTS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  deletePost ({ commit }, payload) {
    return axios.delete(`http://localhost:3006/posts/delete/${payload.postId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }

    })
      .then(function (response) {
        commit('GET_POSTS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  addPost ({ commit }, payload) {
    return axios.post('http://localhost:3006/posts/createPost', {
      title: payload.title,
      content: payload.content
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(function (response) {
        commit('GET_POSTS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  editPost ({ commit }, payload) {
    return axios.post(`http://localhost:3006/posts/updatePost/${payload.postId}`, {
      title: payload.title,
      content: payload.content
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
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
