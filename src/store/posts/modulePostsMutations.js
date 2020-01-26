import moment from 'moment'
export default {
  GET_POSTS (state, payload) {
    state.posts = payload.sort((post1, post2) => {
      if (moment(post1.createdAt).diff(moment(post2.createdAt)) < 0) return 1
      return -1
    })
  }
}
