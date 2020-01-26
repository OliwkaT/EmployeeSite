export default {
  GET_MESSAGES (state, payload) {
    state.messages = payload
    return state
  }
}
