import Vue from 'vue'
import Router from 'vue-router'
import BackendLayout from '@/views/layouts/backend'
import LoglistLayout from '@/views/layouts/loglist'
import LoglistMain from '@/views/loglistMain'
import LoglistDetail from '@/views/loglistMain/_imei'
import WhiteList from '@/views/backendMain/whitelist'
import AppList from '@/views/backendMain/applist'
import Permission from '@/views/backendMain/permission'
Vue.use(Router)

export const asyncRoutes = [
  {
    path: '/backend',
    name: 'backend',
    component: BackendLayout,
    redirect: '/backend/whitelist',
    children: [
        { path: 'whitelist', label: '白名单设置', component: WhiteList },
        { path: 'applist', label: '业务设置', component: AppList, meta: {roles: ['admin']} },
        { path: 'permission', label: '权限设置', component: Permission, meta: {roles: ['admin']} }
    ]
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/loglist'
    },
    {
      path: '/loglist',
      component: LoglistLayout,
      redirect: '/loglist/logmain/default',
      children: [
        { path: 'logmain/:appId', component: LoglistMain, props: true },
        { path: 'logdetail/:userImei', component: LoglistDetail, props: true }
      ]
    }
  ]
})
