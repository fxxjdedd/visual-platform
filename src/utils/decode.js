// 获取appId
export function getDecodedAppId () {
  return Math.ceil(1000 * 1000 * Math.random()) + new Date().getTime().toString()
}
