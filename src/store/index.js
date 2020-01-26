import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import moduleAuth from './auth/modulaAuth'
import moduleTasks from './tasks/moduleTasks'
import modulePosts from './posts/modulePosts'
import moduleChat from './chat/moduleChat'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth: moduleAuth,
      tasks: moduleTasks,
      posts: modulePosts,
      chat: moduleChat
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
