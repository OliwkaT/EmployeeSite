export default {
  getUser: (state) => {
    JSON.parse(localStorage.getItem('user'))
    if (state.user.email) {
      return JSON.parse(localStorage.getItem('user'))
    } else {
      return state.user
    }
  },
  getToken: () => {
    return JSON.parse(localStorage.getItem('token'))
  },
  getUsers: (state) => {
    return state.users
  }
}
