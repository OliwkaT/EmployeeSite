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
  },
  deleteTask ({ commit }, payload) {
    return axios.delete(`http://localhost:3006/tasks/delete/${payload.taskId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }

    })
      .then(function (response) {
        commit('GET_TASKS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  addTask ({ commit }, payload) {
    return axios.post('http://localhost:3006/tasks/createTask', {
      text: payload.text,
      status: payload.status
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(function (response) {
        commit('GET_TASKS', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  editTask ({ commit }, payload) {
    return axios.post(`http://localhost:3006/tasks/updateTask/${payload.taskId}`, {
      text: payload.text,
      status: payload.status
    },
    {
      headers: {
        Authorization: localStorage.getItem('token')
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
