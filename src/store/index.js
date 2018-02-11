import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import loglist from './modules/loglist'
import backend from './modules/backend'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const getters = {}
const actions = {}
// 其实action就相当于service层了，所以不用再单独写service了
export default new Vuex.Store({
  getters,
  actions,
  modules: {
    user,
    loglist,
    backend
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
