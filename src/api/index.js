import { request } from '@/utils'

function getCampBaseData () {
  return request({
    url: `${process.env.BASE_API}/static/data/campbase.json`,
    method: 'get'
  })
}
function getJobWantedData () {
  return request({
    url: `${process.env.BASE_API}/static/data/jobwanted.json`,
    method: 'get'
  })
}
function getTalentData () {
  return request({
    url: `${process.env.BASE_API}/static/data/talent.json`,
    method: 'get'
  })
}
function getJobfairData () {
  return request({
    url: `${process.env.BASE_API}/static/data/jobfair.json`,
    method: 'get'
  })
}
export default {
  getCampBaseData,
  getJobWantedData,
  getTalentData,
  getJobfairData
}
