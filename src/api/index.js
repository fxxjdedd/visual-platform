import { request } from '@/utils'

function getCampBaseData () {
  return request({
    url: `${process.env.BASE_API}/static/data/campbase.json`,
    method: 'get'
  })
}
export default {
  getCampBaseData
}
