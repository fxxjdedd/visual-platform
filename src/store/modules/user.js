import * as types from '../mutation-types'
import {userApi} from '@/api'
import {asyncRoutes} from '@/router'
import {union, flatten} from 'lodash/array'
import {getPmtdRoutes} from '@/utils'

const state = {
  userName: '',
  roles: [],
  apps: [],
  pmtdRoutes: []
}

const getters = {
  userName: state => state.userName,
  roles: state => state.roles,
  apps: state => state.apps,
  pmtdRoutes: state => state.pmtdRoutes
}

const mutations = {
  [types.INIT_USER_INFO] (state, info) {
    state.userName = info.userName
    state.roles = info.roles.map(_ => _.roleName)
    state.apps = union(flatten(info.roles.map(_ => _.apps)), (_) => _.id)
  },
  [types.INIT_PMTD_ROUTES] (state, info) {
    state.pmtdRoutes = getPmtdRoutes(asyncRoutes, state.roles)
  }
}

const actions = {
  async initUserInfo ({commit}) {
    const {data} = await userApi.getUserInfo()
    commit(types.INIT_USER_INFO, data.data)
    commit(types.INIT_PMTD_ROUTES)
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
