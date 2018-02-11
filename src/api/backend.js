import { request } from '@/utils'

/**
 * 获取某一个app的所有imei
 * @param {*} params appId
 */
function getApps () {
  return request({
    url: '/admin/manage/apps',
    method: 'get'
  })
}

function addWhiteList (data) {
  return request({
    url: '/admin/manage/whitelist',
    method: 'post',
    data
  })
}

function addAppList (data) {
  return request({
    url: '/admin/manage/applist',
    method: 'post',
    data
  })
}

export default{
  getApps,
  addWhiteList,
  addAppList
}
