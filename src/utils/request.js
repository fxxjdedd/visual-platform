import axios from 'axios'
import { Message } from 'element-ui'
import base64 from 'base-64'
import utf8 from 'utf8'

const debug = process.env.DEV

axios.defaults.withCredentials = true

const baseService = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  transformRequest (data) {
    // 这个方法的参数只是data或者是params,所以不能区分method
    return data
  }
  // 跨域携带cookie,防止丢失cas认证信息
  // 并且origin 不能是*,只能是具体ip
})

baseService.interceptors.request.use(async req => {
  // TODO: 这儿需要给Header添加token,防止用户直接通过get请求便可以获取数据

  // TODO: 每次都得验证，解决：①判断cookie是否有JESSIONID，但是由于httpOnly为了防止XSS攻击，cas设置其为true，所以没法用js获取。待解决。
  const {data} = await axios.request(`${process.env.BASE_API}/admin/auth/validate`)
  if (!data.success) {
    window.location.href = data.data
    return
  }
  if (req.method === 'post') {
    const str = JSON.stringify(req.data)
    req.data = 'data=' + base64.encode(utf8.encode(str))
  }
  return req
}, error => {
  if (debug) { console.log('requestErr' + error) }
  Promise.reject(error)
})
baseService.interceptors.response.use(resp => {
  console.log(resp)
  return resp
}, error => {
  if (debug) { console.log('responseErr' + error) }

  Message({
    message: '请刷新页面重试！',
    type: 'error',
    duration: 1000
  })
  return Promise.reject(error)
})

export default baseService
