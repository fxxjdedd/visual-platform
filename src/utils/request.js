import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const baseService = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})
export default baseService
