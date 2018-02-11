export function getCurrentTimeStamp () {
  return new Date().getCurrentTimeStamp()
}

export function convertTimeStamp (ts) {
  const date = new Date(ts)
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

export function getCurrentDay () {
  const str = convertTimeStamp(new Date().getTime())
  return str.split(' ')[0]
}

/**
 *
 * @param {*} interval
 */
export function getIntervalTimeStamp ({minute, hour, day, week, year}) {

}
