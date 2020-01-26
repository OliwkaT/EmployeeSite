import state from './moduleAuthState'
import mutations from './moduleAuthMutations'
import actions from './moduleAuthActions'
import getters from './moduleAuthGetters'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
