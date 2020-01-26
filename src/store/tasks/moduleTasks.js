import state from './moduleTasksState'
import mutations from './moduleTasksMutations'
import actions from './moduleTasksActions'
import getters from './moduleTasksGetters'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
