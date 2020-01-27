import moment from 'moment'
export default {
  GET_MESSAGES (state, payload) {
    for (var i = 0; i < payload.sent.length; i++) { payload.sent[i].sent = true }
    let merged = payload.received.concat(payload.sent)
    state.messages = merged.sort((message1, message2) => {
      if (moment(message1.createdAt).diff(moment(message2.createdAt)) > 0) return 1
      return -1
    })
    return state
  }
}
