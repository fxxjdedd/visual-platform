import * as types from '../mutation-types'
import {loglistApi} from '@/api'
const state = {
  appId: '', // sidebar的index是使用appId表示的
  pmtdImeis: [], // [{userImei:'', userName:''}],
  imeiLogs: [],
  loading: true
}

const getters = {
  appId: state => state.appId,
  pmtdImeis: state => state.pmtdImeis,
  imeiLogs: state => state.imeiLogs,
  loading: state => state.loading
}

const mutations = {
  [types.SET_LOGLIST_SIDEBAR_INDEX] (state, appId) {
    state.appId = appId
  },
  [types.SET_LOGLIST_IMEIS] (state, imeis) {
    state.pmtdImeis = imeis
  },
  [types.SET_LOGLIST_LOGS] (state, logs) {
    state.imeiLogs = logs
  },
  [types.SET_LOGLIST_LOADING] (state, loading) {
    state.loading = loading
  }
}

const actions = {
    // TODO:当刚选sidebar的时候，直接加载全部imei的logs
    // TODO:当选择imei筛选时，加载相应的logs
  async getPmtedImeis ({commit, state, rootState}, appId) {
    const {userName} = rootState.user.userName
    const {data} = await loglistApi.getImeis({userName, appId: appId})
    if (data.code !== 200) return
    commit(types.SET_LOGLIST_SIDEBAR_INDEX, appId)
    commit(types.SET_LOGLIST_IMEIS, data.data)
  },
  async getImeiLogs ({commit, state}, {userImei, startTs, intervalTs}) {
    console.log(state)
    commit(types.SET_LOGLIST_LOADING, true)
    const {data} = await loglistApi.getLogs({
      userImei,
      appId: state.appId,
      startTs: startTs,
      intervalTs: intervalTs
    })
    if (data.code !== 200) return
    commit(types.SET_LOGLIST_LOGS, data.data)
    setTimeout(() => {
      commit(types.SET_LOGLIST_LOADING, false)
    }, 500)
  }
}

export default {
  // !important: 没有这个就不会有namespace
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
