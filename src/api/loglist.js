import { request } from '@/utils'

/**
 * 获取某一个app的所有imei
 * @param {*} params appId
 */
function getImeis (params) {
  return request({
    url: '/admin/log/imeis',
    method: 'get',
    params
  })
}

/**
 * 获取某一个imei的所有日志
 * @param {*} params userImei
 */
function getLogs (params) {
  return request({
    url: '/admin/log/logs',
    method: 'get',
    params
  })
}

export default {
  getLogs,
  getImeis
}
