import * as types from '../mutation-types'
import {backendApi} from '@/api'
const state = {
  apps: []
}

const getters = {
  apps: state => state.apps
}

const mutations = {
  [types.SET_BACKEND_APPS] (state, apps) {
    state.apps = apps
  }
}

const actions = {
  async getApps ({commit}) {
    const {data} = await backendApi.getApps()
    commit(types.SET_BACKEND_APPS, data.data)
  },
  async addWhiteList (_, param) {
    const {data} = await backendApi.addWhiteList(param)
    return data.code
  },
  async addAppList (_, param) {
    const {data} = await backendApi.addAppList(param)
    return data.code
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
