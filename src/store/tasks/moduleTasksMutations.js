export default {
  GET_TASKS (state, payload) {
    state.tasks = payload
    return state
  }
}
