import state from './modulePostsState'
import mutations from './modulePostsMutations'
import actions from './modulePostsActions'
import getters from './modulePostsGetters'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
