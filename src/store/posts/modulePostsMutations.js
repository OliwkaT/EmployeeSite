export default {
  GET_POSTS (state, payload) {
    state.posts = payload
    return state
  }
}
