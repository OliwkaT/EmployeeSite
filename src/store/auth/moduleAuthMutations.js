export default {
  UPDATE_AUTHENTICATED_USER (state, { user, token }) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
    state.user = user
    return state
  },
  UPDATE_USER (state, user) {
    state.user = user
    return state
  }
}
