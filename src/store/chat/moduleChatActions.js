import axios from 'axios'

export default {
  getMessages ({ commit }, payload) {
    return axios.get(`http://localhost:3006/chat/getMessages/${payload.senderId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }

    })
      .then(function (response) {
        commit('GET_MESSAGES', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  createMessage ({ commit }, payload) {
    return axios.post(`http://localhost:3006/chat/createMessage/${payload.receiverId}`, {
      text: payload.text
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(function (response) {
        commit('GET_MESSAGES', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
