import state from './moduleChatState'
import mutations from './moduleChatMutations'
import actions from './moduleChatActions'
import getters from './moduleChatGetters'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
