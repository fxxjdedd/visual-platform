import { request } from '@/utils'

function getUserInfo () {
  return request({
    url: '/admin/user/userinfo',
    method: 'get'
  })
}

export default {
  getUserInfo
}
