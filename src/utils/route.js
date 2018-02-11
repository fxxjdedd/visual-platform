import {intersection} from 'lodash/array'
function isPmtd (route, roles) {
  if (route.meta && route.meta.roles && route.meta.roles.length) {
    return intersection(route.meta.roles, roles).length
  }
  return true
}
export function getPmtdRoutes (routes, roles) {
  const pmtedRoutes = routes.filter(route => {
    if (isPmtd(route, roles)) {
      if (route.children && route.children.length) {
        route.children = getPmtdRoutes(route.children, roles)
      }
      return true
    }
    return false
  })
  return pmtedRoutes
}
